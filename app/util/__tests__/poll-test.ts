import { getPoll, votePoll, timeStr, votePer, voters, votes } from "../poll";
import * as Session from "../../util/session";
import ExampleSession from "../../example/session";
import ExamplePoll from "../../example/poll";
import DayJS from "dayjs";

import * as Rest from "../../services/api/Rest";
jest.mock("../../services/api/Rest");

jest.mock("../../util/session", () => ({
    getDomainAndToken: jest.fn(),
}));

describe("Util/Poll", () => {
    it("getPoll", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.getPoll.mockImplementation(() => ExamplePoll());
        expect(await getPoll("34830")).toEqual({ "data": ExamplePoll(), "error": null });
        Session.getDomainAndToken.mockClear();
        Rest.getPoll.mockClear();
    });
    it("getPoll Network Error", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.getPoll.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await getPoll("34830")).toEqual({ "data": null, "error": "Network Error" });
        Session.getDomainAndToken.mockClear();
        Rest.getPoll.mockClear();
    });
    it("votePoll", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.votePoll.mockImplementation(() => ExamplePoll());
        expect(await votePoll("34830", [1])).toEqual({ "data": ExamplePoll(), "error": null });
        Session.getDomainAndToken.mockClear();
        Rest.votePoll.mockClear();
    });
    it("votePoll Network Error", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.votePoll.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await votePoll("34830", [1])).toEqual({ "data": null, "error": "Network Error" });
        Session.getDomainAndToken.mockClear();
        Rest.votePoll.mockClear();
    });
    it("timeStr", () => {
        expect(timeStr("2019-12-05T04:05:08.302Z", true, false)).toEqual("Ended");
        expect(timeStr(null, false, false)).toEqual("Voting");
        expect(timeStr(null, false, true)).toEqual("Multiple Voting");
        expect(timeStr(DayJS().add(3, "week").format(), false, false)).toEqual("Voting 503 Hours");
        expect(timeStr(DayJS().add(3, "week").format(), false, true)).toEqual("Multiple Voting 503 Hours");
    });
    it("votePer", () => {
        expect(votePer(0, 0)).toEqual("0%");
        expect(votePer(0, 1)).toEqual("0%");
        expect(votePer(1, 4)).toEqual("25%");
        expect(votePer("a", 4)).toEqual("0%");
    });
    
    it("voters", () => {
        expect(voters(null)).toEqual("");
        expect(voters(1)).toEqual("1 Person");
        expect(voters(100)).toEqual("100 People");
    });    
    it("votes", () => {
        expect(votes(null)).toEqual("");
        expect(votes(100)).toEqual("(100 votes)");
    });
});