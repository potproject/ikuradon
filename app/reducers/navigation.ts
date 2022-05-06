import { createReducer } from "@reduxjs/toolkit";
import * as Navigation from "../actions/actiontypes/navigation";

export default createReducer({}, (builder) => {
    builder
        .addCase(Navigation.NAVIGATE, (state, action) => {})
        .addCase(Navigation.COMPLETE_TRANSITION, (state, action) => {});
});

