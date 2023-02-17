import * as AppInit from "../actions/actiontypes/appinit";
import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
    init: false,
};

export default createReducer(initialState, (builder) => {
    builder.addCase(AppInit.APPINIT_COMPLETE, (state, action) => {
        state.init = true;
    })
    .addCase(AppInit.APPINIT_FAILED, (state, action) => {
        state.init = false;
    });
});
