import * as CurrentUserActionTypes from "../actions/actiontypes/currentuser";
import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
    user_credentials: null,
    domain: "",
    access_token: "",
    notification_count: 0,
    instance: null,
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(CurrentUserActionTypes.UPDATE_CURRENT_USER, (state, action) => {
            return {
                user_credentials: action.user_credentials,
                domain: action.domain,
                access_token: action.access_token,
                notification_count: 0,
                instance: action.instance,
            };
        })
        .addCase(CurrentUserActionTypes.DELETED_CURRENT_USER, (state, action) => {
            return initialState;
        })
        .addCase(CurrentUserActionTypes.NOTIFICATION_PUSH, (state, action) => {
            state.notification_count += 1;
        })
        .addCase(CurrentUserActionTypes.NOTIFICATION_CLEAR, (state, action) => {
            state.notification_count = 0;
        });
});
