import * as CurrentUserActionTypes from "../actions/actiontypes/currentuser";
import { createReducer } from "@reduxjs/toolkit";
import { Entity } from "megalodon";
import { sns } from "../constants/sns";

type currentUser = {
    sns: sns|null
    user_credentials: Entity.Account;
    domain: string;
    access_token: string;
    notification_count: number;
    instance: Entity.Instance;
};

export const initialState: currentUser = {
    sns: null,
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
                sns: action.sns,
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
