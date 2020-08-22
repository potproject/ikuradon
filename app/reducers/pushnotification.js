import * as PushNotificationActionTypes from "../actions/actiontypes/pushnotification";
import * as Storage from "../util/storage";

const initialState = {
    //      "mastodon.xxxx.net:xxxxxx:mastodon.push.net": {
    //          subscribeID : "xxx",
    //          expoToken : "xxxx",
    //          accessToken: "xxxx",
    //          server: "mastodon.push.net"
    //      }", ...
};

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
        Storage.setItem("push", newstate);
    }
    return newstate;
}
