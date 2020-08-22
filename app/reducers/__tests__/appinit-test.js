import AppInitReducer, { initialState } from "../appinit";

import * as AppInit from "../../actions/actiontypes/appinit";

describe("AppInitReducer", () => {
    it("init", () => {
        expect(AppInitReducer()).toEqual(initialState);
    });
    it("AppInit.APPINIT_COMPLETE", () => {
        expect(AppInitReducer(initialState, { type:AppInit.APPINIT_COMPLETE })).toEqual({ init:true });
    });
});