import AppInitReducer, { initialState } from "../appinit";

import * as AppInit from "../../actions/actiontypes/appinit";

describe("AppInitReducer", () => {
    it("AppInit.APPINIT_COMPLETE", () => {
        expect(AppInitReducer(initialState, { type: AppInit.APPINIT_COMPLETE })).toEqual({ init: true });
    });
    it("AppInit.APPINIT_FAILED", () => {
        expect(AppInitReducer(initialState, { type: AppInit.APPINIT_FAILED })).toEqual({ init: false });
    });
});
