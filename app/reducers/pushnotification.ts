import * as PushNotificationActionTypes from "../actions/actiontypes/pushnotification";
import * as Storage from "../util/storage";
import * as CONST_Storage from "../constants/storage";
import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
    //      "mastodon.xxxx.net:xxxxxx:mastodon.push.net": {
    //          subscribeID : "xxx",
    //          expoToken : "xxxx",
    //          accessToken: "xxxx",
    //          server: "mastodon.push.net"
    //      }", ...
};

export default createReducer(initialState, (builder) => {
    builder
        .addCase(PushNotificationActionTypes.PUSHNOTIFICATION_SUBSCRIBE, (state, action) => {
            state[action.id] = {
                subscribeID : action.subscribeID,
                expoToken : action.expoToken,
                accessToken: action.accessToken,
                server: action.server
            };
            Storage.setItem(CONST_Storage.Push, { ...state });
        })
        .addCase(PushNotificationActionTypes.PUSHNOTIFICATION_UNSUBSCRIBE, (state, action) => {
            const newState = { ...state };
            delete newState[action.id];
            Storage.setItem(CONST_Storage.Push, newState);
            return newState;
        })
        .addCase(PushNotificationActionTypes.PUSHNOTIFICATION_LOAD, (state, action) => {
            return action.pushNotifications;
        })
        .addCase(PushNotificationActionTypes.PUSHNOTIFICATION_RESET, (state, action) => {
            Storage.setItem(CONST_Storage.Push, initialState);
            return initialState;
        });
});

/** 
export default function PushNotification(state = initialState, action = {}) {
    let newstate = state;
    switch (action.type) {
        case PushNotificationActionTypes.PUSHNOTIFICATION_SUBSCRIBE:
            newstate = Object.assign({}, state);
            newstate[action.id] = {
                subscribeID : action.subscribeID,
                expoToken : action.expoToken,
                accessToken: action.accessToken,
                server: action.server
            };
            break;
        case PushNotificationActionTypes.PUSHNOTIFICATION_UNSUBSCRIBE:
            newstate = Object.assign({}, state);
            delete newstate[action.id];
            break;
        case PushNotificationActionTypes.PUSHNOTIFICATION_LOAD:
            newstate = Object.assign({}, action.pushNotifications);
            break;
        case PushNotificationActionTypes.PUSHNOTIFICATION_RESET:
            newstate = Object.assign({}, initialState);
            break;
    }
    if (state !== newstate) {
        Storage.setItem(CONST_Storage.Push, newstate);
    }
    return newstate;
}
*/