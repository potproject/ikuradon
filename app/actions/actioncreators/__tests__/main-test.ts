import { hide, deleting, newLoadingTimeline, oldLoadingTimeline } from "../main";
import * as Main from "../../actiontypes/main";

import * as Session from "../../../util/session";

import Networking from "../../../services/Networking";
import DropDownHolder from "../../../services/DropDownHolder";

import ExampleSession from "../../../example/session";
import ExampleStatus from "../../../example/status";
import * as Rest from "../../../services/api/Rest";

jest.mock("../../../util/session");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));
jest.mock("../../../services/Networking");
jest.mock("../../../services/api/Rest");

describe("Action/Main", () => {
    it("hide", () => {
        expect(hide("100100")).toEqual({ type: Main.HIDE_MASTOLIST, id: "100100" });
    });
    it("deleting", done => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        let action = deleting("100100");
        Rest.deleteStatus.mockImplementation(() => {});
        action(({ type, id }) => {
            expect(type).toEqual(Main.HIDE_MASTOLIST);
            expect(id).toEqual("100100");
            done();
        });
        Session.getDomainAndToken.mockClear();
        Rest.deleteStatus.mockClear();
    });
    it("deleting error", done => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.deleteStatus.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        let action = deleting("100100");
        action(() => null);
        Session.getDomainAndToken.mockClear();
        Rest.deleteStatus.mockClear();
        DropDownHolder.error.mockClear();
    });
    it("newLoadingTimeline", done => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.getHomeTimeline.mockImplementation(() => [ExampleStatus()]);
        let action = newLoadingTimeline("home", null, false, 1);
        let call = 0;
        action((callback) => {
            if (call === 0){
                expect(callback).toEqual({ type: Main.REFRESHING_MASTOLIST, reducerType: "home" });
                call++;
            } else {
                let { type, data, reducerType, clear, streaming } = callback;
                expect(type).toEqual(Main.NEW_UPDATE_MASTOLIST);
                expect(data).toEqual([ExampleStatus()]);
                expect(reducerType).toEqual("home");
                expect(clear).toEqual(false);
                expect(streaming).toEqual(false);
                done();
            }
        });
        Session.getDomainAndToken.mockClear();
        Rest.getHomeTimeline.mockClear();
    });
    it("newLoadingTimeline Network Error", done => {
        Session.getDomainAndToken.mockImplementation(() => {
            throw new Error("Network Error");
        });
        let action = newLoadingTimeline("home", null);
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
        });
        let call = 0;
        action((callback) => {
            call === 0 && expect(callback).toEqual({ type: Main.REFRESHING_MASTOLIST, reducerType: "home" });
            call === 1 && (expect(callback).toEqual({ type: Main.STOP_REFRESHING_MASTOLIST, reducerType: "home" }) || done());
            call++;
        });
        Session.getDomainAndToken.mockClear();
        DropDownHolder.error.mockClear();
    });
    it("oldLoadingTimeline", done => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.getHomeTimeline.mockImplementation(() => [ExampleStatus()]);
        let action = oldLoadingTimeline("home", null, 1);
        let call = 0;
        action((callback) => {
            if (call === 0){
                expect(callback).toEqual({ type: Main.LOADING_MASTOLIST, reducerType: "home" });
                call++;
            } else {
                let { type, data, reducerType, clear } = callback;
                expect(type).toEqual(Main.OLD_UPDATE_MASTOLIST);
                expect(data).toEqual([ExampleStatus()]);
                expect(reducerType).toEqual("home");
                expect(clear).toEqual(false);
                done();
            }
        });
        Session.getDomainAndToken.mockClear();
        Rest.getHomeTimeline.mockClear();
    });
    it("oldLoadingTimeline Network Error", done => {
        Session.getDomainAndToken.mockImplementation(() => {
            throw new Error("Network Error");
        });
        let action = oldLoadingTimeline("home", null);
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
        });
        let call = 0;
        action((callback) => {
            call === 0 && expect(callback).toEqual({ type: Main.LOADING_MASTOLIST, reducerType: "home" });
            call === 1 && (expect(callback).toEqual({ type: Main.STOP_LOADING_MASTOLIST, reducerType: "home" }) || done());
            call++;
        });
        Session.getDomainAndToken.mockClear();
        DropDownHolder.error.mockClear();
    });
});