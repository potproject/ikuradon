import MainReducer, { initialState } from "../main";
import * as Main from "../../actions/actiontypes/main";
import { status } from "./example";
import { advanceTo } from "jest-date-mock";

function createStatusToStateMock(status, type, date, newArrival){
    // deep copy
    let ac = JSON.parse(JSON.stringify(initialState));
    ac[type].data = [status];
    ac[type].newArrival = newArrival;
    ac[type].minId = status.id;
    ac[type].maxId = status.id;
    ac[type].lastUpdate = Math.floor(date.getTime() / 1000);
    return ac;
}

describe("MainReducer", () => {
    it("init", () => {
        expect(MainReducer()).toEqual(initialState);
    });
    it("Main.OLD_UPDATE_MASTOLIST", () => {
        advanceTo(new Date(2020, 8, 31, 10, 20, 30));
        const ex = MainReducer(initialState, { 
            type: Main.OLD_UPDATE_MASTOLIST,
            data: [status],
            reducerType: "home",
            clear: false,
            streaming: false
        });
        let ac = createStatusToStateMock(status, "home", new Date(2020, 8, 31, 10, 20, 30), 0);
        expect(ex).toEqual(ac);
    });
    it("Main.NEW_UPDATE_MASTOLIST", () => {
        advanceTo(new Date(2020, 8, 31, 10, 20, 30));
        const ex = MainReducer(initialState, { 
            type: Main.NEW_UPDATE_MASTOLIST,
            data: [status],
            reducerType: "home",
            clear: false,
            streaming: false
        });
        let ac = createStatusToStateMock(status, "home", new Date(2020, 8, 31, 10, 20, 30), 1);
        expect(ex).toEqual(ac);
    });
});