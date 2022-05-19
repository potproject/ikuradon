import { createReducer } from "@reduxjs/toolkit";
import * as StreamingActionTypes from "../actions/actiontypes/streaming";

export const initialState = {
    home: false,
    local: false,
    federal: false
};

export default createReducer({}, (builder) => {
    builder
        .addCase(StreamingActionTypes.STREAM_START, (state, action) => {
            state[action.reducerType] = true;
        })
        .addCase(StreamingActionTypes.STREAM_STOP, (state, action) => {
            state[action.reducerType] = false;
        })
        .addCase(StreamingActionTypes.STREAM_ALLSTOP, (state, action) => {
            return initialState;
        });
});
