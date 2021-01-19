import { timeStr, votePer, voters, votes } from "../poll";
import DayJS from "dayjs";

describe("Util/Poll", () => {
    it("timeStr", () => {
        expect(timeStr("2019-12-05T04:05:08.302Z", true)).toEqual("Ended");
        expect(timeStr(null, false)).toEqual("Voting");
        expect(timeStr(DayJS().add(3, "week").format(), false)).toEqual("503 Hours");
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