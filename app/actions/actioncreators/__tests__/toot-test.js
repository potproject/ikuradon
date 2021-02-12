import { toot } from "../toot";

import Networking from "../../../services/Networking";
import * as Session from "../../../util/session";

import ExampleSession from "../../../example/session";
import ExampleStatus from "../../../example/status";

import * as CONST_API from "../../../constants/api";
import * as Toot from "../../actiontypes/toot";

jest.mock("../../../util/session");
jest.mock("../../../services/Networking");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

describe("Action/Toot", () => {
    it("toot", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation((domain, api, restParams, postParams, access_token) => {
            try {
                let ac = ExampleSession();
                expect(domain).toEqual(ac.domain);
                expect(api).toEqual(CONST_API.POST_STATUS);
                expect(restParams).toEqual(null);
                expect(postParams).toEqual({
                    "in_reply_to_id": null,
                    "media_ids": [],
                    "scheduled_at": null,
                    "sensitive": false,
                    "spoiler_text": "",
                    "status": "status",
                    "visibility": "public"
                });
                expect(access_token).toEqual(ac.access_token);
            } catch (e){
                done(e);
            }
            return ExampleStatus();
        });
        let action = toot("status", "public", false, "");
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Toot.TOOT_WAITING });
                call === 1 && (expect(callback).toEqual({ type: Toot.TOOT_OK }) || done());
                call++;
            } catch (e){
                done(e);
            }
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
    it("toot reply", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation((domain, api, restParams, postParams, access_token) => {
            try {let ac = ExampleSession();
                expect(domain).toEqual(ac.domain);
                expect(api).toEqual(CONST_API.POST_STATUS);
                expect(restParams).toEqual(null);
                expect(postParams).toEqual({
                    "in_reply_to_id": "100100",
                    "media_ids": [],
                    "scheduled_at": null,
                    "sensitive": false,
                    "spoiler_text": "",
                    "status": "status",
                    "visibility": "public"
                });
                expect(access_token).toEqual(ac.access_token);
            } catch (e){
                done(e);
            }
            return ExampleStatus();
        });
        let action = toot("status", "public", false, "", [], { tootid:"100100" }, null);
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Toot.TOOT_WAITING });
                call === 1 && (expect(callback).toEqual({ type: Toot.TOOT_OK }) || done());
                call++;
            } catch (e){
                done(e);
            }
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
    it("toot fail", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        let action = toot("status", "public", false, "");
        let call = 0;
        action((callback) => {
            try {
                call === 0 && expect(callback).toEqual({ type: Toot.TOOT_WAITING });
                call === 1 && (expect(callback).toEqual({ type: Toot.TOOT_FAILURE }) || done());
                call++;
            } catch (e){
                done(e);
            }
        });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
});