import * as PushNotificationActionTypes from "../actions/actiontypes/pushnotification";

const initialState = {
    //  push_notifications: {
    //      "mastodon.xxxx.net:xxxxxx:mastodon.push.net": {
    //          subscribeID : "xxx",
    //          expoToken : "xxxx",
    //          accessToken: "xxxx",
    //          server: "mastodon.push.net"
    //      }", ...
    //  }
    push_notifications: []
};

export default function PushNotification(state = initialState, action = {}) {
    switch (action.type) {
        case PushNotificationActionTypes.PUSHNOTIFICATION_SUBSCRIBE:
            return state;
        case PushNotificationActionTypes.PUSHNOTIFICATION_UNSUBSCRIBE:
            return state;
        default:
            return state;
    }
}
