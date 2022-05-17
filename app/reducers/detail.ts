import { createReducer } from "@reduxjs/toolkit";
import * as Detail from "../actions/actiontypes/detail";

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
        .addCase(Detail.DETAIL_RESET, (state, action) => {
            return initialState;
        });
});
