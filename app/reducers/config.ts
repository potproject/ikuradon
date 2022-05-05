import * as ConfigActionTypes from "../actions/actiontypes/config";

import * as Storage from "../util/storage";
import * as CONST_Storage from "../constants/storage";
import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
    backgroundImage: null,

    invisible: {
        //表示設定 trueで非表示
        home: false,
        local: false,
        federal: false,
        notifications: false,
    },

    theme: "default",
    //textsize,textcolor,etc...
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(ConfigActionTypes.SET_BACKGROUNDIMAGE, (state, action) => {
            state.backgroundImage = action.backgroundImage;
        })
        .addCase(ConfigActionTypes.DELETE_BACKGROUNDIMAGE, (state, _action) => {
            state.backgroundImage = null;
        })
        .addCase(ConfigActionTypes.INVISIBLE_SETTING, (state, action) => {
            state.invisible = { ...state.invisible, ...action.invisible };
        })
        .addCase(ConfigActionTypes.CHANGE_THEME, (state, action) => {
            state.theme = action.theme;
        })
        .addCase(ConfigActionTypes.CONFIG_LOAD, (state, action) => {
            return { ...initialState, ...action.config };
        })
        .addCase(ConfigActionTypes.CONFIG_RESET, (state, _action) => {
            return initialState;
        })
        .addMatcher(
            (action) => true,
            (state, action) => {
                Storage.setItem(CONST_Storage.Config, state);
            }
        );
});
