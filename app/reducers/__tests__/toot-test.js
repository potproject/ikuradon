import TootReducer, { initialState } from "../toot";

import * as Toot from "../../actions/actiontypes/toot";

describe("TootReducer", () => {
    it("init", () => {
        expect(TootReducer()).toEqual(initialState);
    });
    it("Toot.TOOT_WAITING ", () => {
        expect(TootReducer(initialState, { type:Toot.TOOT_WAITING })).toEqual({ tootWaiting: true });
    });
    it("Toot.TOOT_FAILURE ", () => {
        expect(TootReducer(initialState, { type:Toot.TOOT_FAILURE })).toEqual({ tootWaiting: false });
    });
    it("Toot.TOOT_OK ", () => {
        expect(TootReducer(initialState, { type:Toot.TOOT_OK })).toEqual({ tootWaiting: false });
    });
});