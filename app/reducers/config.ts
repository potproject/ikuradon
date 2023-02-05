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
    fontSize: {
        userName: 16,
        userNameEmoji: 16,
        dateText: 14,
        detailText: 22,
        text: 16,
        emoji: 16,
    }
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
        .addCase(ConfigActionTypes.CHANGE_FONTSIZE, (state, action) => {
            state.fontSize = { ...state.fontSize, ...action.fontSize };
        })
        .addMatcher(
            ({ type }) => type === ConfigActionTypes.SET_BACKGROUNDIMAGE ||
            type === ConfigActionTypes.DELETE_BACKGROUNDIMAGE ||
            type === ConfigActionTypes.INVISIBLE_SETTING ||
            type === ConfigActionTypes.CHANGE_THEME ||
            type === ConfigActionTypes.CHANGE_FONTSIZE ||
            type === ConfigActionTypes.CONFIG_RESET
            ,
            (state, action) => {
                Storage.setItem(CONST_Storage.Config, state);
                return state;
            }
        );
});
