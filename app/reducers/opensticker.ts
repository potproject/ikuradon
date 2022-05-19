import * as OpenStickerActionTypes from "../actions/actiontypes/opensticker";
import * as Storage from "../util/storage";
import * as CONST_Storage from "../constants/storage";
import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
    use: false,
    server: "https://s.0px.io/json",
    data: {}
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(OpenStickerActionTypes.OPENSTICKER_LOAD, (state, action) => {
            const newState = action.openSticker;
            Storage.setItem(CONST_Storage.OpenSticker, newState);
            return newState;
        })
        .addCase(OpenStickerActionTypes.OPENSTICKER_ON, (state, action) => {
            const newState = { use: true, server:action.server, data:action.data };
            Storage.setItem(CONST_Storage.OpenSticker, newState);
            return newState;
        })
        .addCase(OpenStickerActionTypes.OPENSTICKER_OFF, (state, action) => {
            const newState = initialState;
            Storage.setItem(CONST_Storage.OpenSticker, newState);
            return newState;
        });
});
