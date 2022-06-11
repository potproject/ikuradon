import { createReducer } from "@reduxjs/toolkit";
import * as Detail from "../actions/actiontypes/detail";
import * as MastorowActionTypes from "../actions/actiontypes/mastorow";

export const initialState = {
    data: {},
    ancestors: [], // 前のToot
    descendants: [], // 次のToot
    loaded: null, // true=完了、false=失敗、null=存在しない
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(Detail.DETAIL_GET, (state, action) => {
            state.data = action.data;
            state.ancestors = action.ancestors;
            state.descendants = action.descendants;
            state.loaded = action.loaded;
        })
        .addCase(MastorowActionTypes.REACTION_MASTOROW, (state, action) => {
            if (state.data && action.id === state.data.id) {
                state.data.emoji_reactions = action.emoji_reactions;
                state.data.emojis = action.emojis;
            }
        })
        .addCase(Detail.DETAIL_RESET, (state, action) => {
            return initialState;
        });
});
