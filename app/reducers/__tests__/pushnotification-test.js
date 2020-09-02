import PushNotificationReducer, { initialState } from "../pushnotification";

import * as PushNotification from "../../actions/actiontypes/pushnotification";
import pushNotificationMock from "../../example/pushNotification";

describe("PushNotificationReducer", () => {
    it("init", () => {
        expect(PushNotificationReducer()).toEqual(initialState);
    });
    it("PushNotification.PUSHNOTIFICATION_SUBSCRIBE", () => {
        const pushNotification = pushNotificationMock();
        const ex = PushNotificationReducer(initialState,
            {
                type: PushNotification.PUSHNOTIFICATION_SUBSCRIBE,
                id: "mastodon.server.net:ACCEESS_TOKEN",
                subscribeID: pushNotification["mastodon.server.net:ACCEESS_TOKEN"].subscribeID,
                expoToken: pushNotification["mastodon.server.net:ACCEESS_TOKEN"].expoToken,
                accessToken: pushNotification["mastodon.server.net:ACCEESS_TOKEN"].accessToken,
                server: pushNotification["mastodon.server.net:ACCEESS_TOKEN"].server
            }
        );
        expect(ex).toEqual(pushNotification);
    });
    it("PushNotification.PUSHNOTIFICATION_UNSUBSCRIBE", () => {
        const ex = PushNotificationReducer(pushNotificationMock,
            {
                type: PushNotification.PUSHNOTIFICATION_UNSUBSCRIBE,
                id: "mastodon.server.net:ACCEESS_TOKEN"
            }
        );
        expect(ex).toEqual(initialState);
    });
    it("PushNotification.PUSHNOTIFICATION_LOAD", () => {
        const ex = PushNotificationReducer(initialState,
            {
                type: PushNotification.PUSHNOTIFICATION_LOAD,
                pushNotifications: pushNotificationMock()
            }
        );
        expect(ex).toEqual(pushNotificationMock());
    });
    it("PushNotification.PUSHNOTIFICATION_RESET", () => {
        const ex = PushNotificationReducer(pushNotificationMock, { type: PushNotification.PUSHNOTIFICATION_RESET });
        expect(ex).toEqual(initialState);
    });
});