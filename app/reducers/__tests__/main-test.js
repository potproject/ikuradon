import MainReducer, { initialState, changeItem } from "../main";
import * as Main from "../../actions/actiontypes/main";
import * as MastoRow from "../../actions/actiontypes/mastorow";
import status from "../../example/status";
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
            data: [status()],
            reducerType: "home",
            clear: false,
            streaming: false
        });
        let ac = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 0);
        expect(ex).toEqual(ac);
    });
    it("Main.NEW_UPDATE_MASTOLIST", () => {
        advanceTo(new Date(2020, 8, 31, 10, 20, 30));
        const ex = MainReducer(initialState, { 
            type: Main.NEW_UPDATE_MASTOLIST,
            data: [status()],
            reducerType: "home",
            clear: false,
            streaming: false
        });
        let ac = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 1);
        expect(ex).toEqual(ac);
    });
    it("Main.NEW_UPDATE_MASTOLIST with clear", () => {
        advanceTo(new Date(2020, 8, 31, 10, 20, 30));
        const ex = MainReducer(initialState, { 
            type: Main.NEW_UPDATE_MASTOLIST,
            data: [status()],
            reducerType: "home",
            clear: true,
            streaming: false
        });
        let ac = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 0);
        expect(ex).toEqual(ac);
    });
    it("Main.REFRESHING_MASTOLIST", () => {
        const ex = MainReducer(initialState, { 
            type: Main.REFRESHING_MASTOLIST,
            reducerType: "home"
        });
        let ac = JSON.parse(JSON.stringify(initialState));
        ac.home.refreshing = true;
        ac.home.loading = true;
        expect(ex).toEqual(ac);
    });
    it("Main.STOP_REFRESHING_MASTOLIST", () => {
        let init = JSON.parse(JSON.stringify(initialState));
        init.home.refreshing = true;
        const ex = MainReducer(init, { 
            type: Main.STOP_REFRESHING_MASTOLIST,
            reducerType: "home"
        });
        let ac = initialState;
        expect(ex).toEqual(ac);
    });
    it("Main.LOADING_MASTOLIST", () => {
        const ex = MainReducer(initialState, { 
            type: Main.LOADING_MASTOLIST,
            reducerType: "home"
        });
        let ac = JSON.parse(JSON.stringify(initialState));
        ac.home.loading = true;
        expect(ex).toEqual(ac);
    });
    it("Main.STOP_LOADING_MASTOLIST", () => {
        let init = JSON.parse(JSON.stringify(initialState));
        init.home.loading = true;
        const ex = MainReducer(init, { 
            type: Main.STOP_LOADING_MASTOLIST,
            reducerType: "home"
        });
        let ac = initialState;
        expect(ex).toEqual(ac);
    });
    it("Main.HIDE_MASTOLIST", () => {
        advanceTo(new Date(2020, 8, 31, 10, 20, 30));
        let init = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 1);
        const ex = MainReducer(init, { 
            type: Main.HIDE_MASTOLIST,
            id: "103270115826048975"
        });
        let ac = JSON.parse(JSON.stringify(init));
        ac.home.data = [];
        expect(ex).toEqual(ac);
    });
    it("Main.ALLCLEAR_MASTOLIST", () => {
        let init = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 1);
        const ex = MainReducer(init, {
            type: Main.ALLCLEAR_MASTOLIST,
        });
        expect(ex).toEqual(initialState);
    });
    it("MastoRow.BOOST_MASTOROW", () => {
        let init = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 1);
        const ex = MainReducer(init, { 
            type: MastoRow.BOOST_MASTOROW,
            id: "103270115826048975",
            boosted: true
        });
        init.home.data[0].reblogged = true;
        expect(init).toEqual(ex);
        const ex2 = MainReducer(ex, { 
            type: MastoRow.BOOST_MASTOROW,
            id: "103270115826048975",
            boosted: false
        });
        init.home.data[0].reblogged = false;
        expect(init).toEqual(ex2);
    });
    it("MastoRow.FAVOURITE_MASTOROW", () => {
        let init = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 1);
        const ex = MainReducer(init, { 
            type: MastoRow.FAVOURITE_MASTOROW,
            id: "103270115826048975",
            favourited: true
        });
        init.home.data[0].favourited = true;
        expect(init).toEqual(ex);
        const ex2 = MainReducer(ex, { 
            type: MastoRow.FAVOURITE_MASTOROW,
            id: "103270115826048975",
            favourited: false
        });
        init.home.data[0].favourited = false;
        expect(init).toEqual(ex2);
    });
    it("MastoRow.BOOKMARK_MASTOROW", () => {
        let init = createStatusToStateMock(status(), "home", new Date(2020, 8, 31, 10, 20, 30), 1);
        const ex = MainReducer(init, { 
            type: MastoRow.BOOKMARK_MASTOROW,
            id: "103270115826048975",
            bookmarked: true
        });
        init.home.data[0].bookmarked = true;
        expect(init).toEqual(ex);
        const ex2 = MainReducer(ex, { 
            type: MastoRow.BOOKMARK_MASTOROW,
            id: "103270115826048975",
            bookmarked: false
        });
        init.home.data[0].bookmarked = false;
        expect(init).toEqual(ex2);
    });
});