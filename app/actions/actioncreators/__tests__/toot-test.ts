import { toot } from "../toot";

import * as Session from "../../../util/session";

import ExampleSession from "../../../example/session";
import ExampleStatus from "../../../example/status";

import * as Toot from "../../actiontypes/toot";
import * as Rest from "../../../services/api/Rest";

jest.mock("../../../util/session");
jest.mock("../../../services/NavigationService");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));
jest.mock("../../../services/api/Rest");

describe("Action/Toot", () => {
    it("toot", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.postStatus.mockImplementation((sns, domain, access_token, status, options) => {
            try {
                let ac = ExampleSession();
                expect(sns).toEqual(ac.sns);
                expect(domain).toEqual(ac.domain);
                expect(access_token).toEqual(ac.access_token);
                expect(status).toEqual("status");
                expect(options).toEqual({
                    "in_reply_to_id": null,
                    "media_ids": undefined,
                    "scheduled_at": null,
                    "sensitive": false,
                    "spoiler_text": "",
                    "visibility": "public"
                });
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
        Rest.postStatus.mockClear();
    });
    it("toot reply", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.postStatus.mockImplementation((sns, domain, access_token, status, options) => {
            try {
                let ac = ExampleSession();
                expect(sns).toEqual(ac.sns);
                expect(domain).toEqual(ac.domain);
                expect(access_token).toEqual(ac.access_token);
                expect(status).toEqual("status");
                expect(options).toEqual({
                    "in_reply_to_id": "100100",
                    "media_ids": undefined,
                    "scheduled_at": null,
                    "sensitive": false,
                    "spoiler_text": "",
                    "visibility": "public"
                });
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
        Rest.postStatus.mockClear();
    });
    it("toot fail", done => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.postStatus.mockImplementation(() => {
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
        Rest.postStatus.mockClear();
    });
});