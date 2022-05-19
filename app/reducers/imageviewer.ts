import { createReducer } from "@reduxjs/toolkit";
import * as ImageViewer from "../actions/actiontypes/imageviewer";

export const initialState = {
    data: [],
    index: 0,
    visible: false,
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(ImageViewer.IMAGEVIEWER_OPEN, (state, action) => {
            state.data = action.data;
            state.index = action.index;
            state.visible = true;
        })
        .addCase(ImageViewer.IMAGEVIEWER_CLOSE, (state, action) => {
            state.data = [];
            state.index = 0;
            state.visible = false;
        });
});
