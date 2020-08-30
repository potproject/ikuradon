import PushNotificationReducer, { initialState } from "../pushnotification";

import * as PushNotification from "../../actions/actiontypes/pushnotification";
import { pushNotification as pushNotificationMock } from "./example";

describe("PushNotificationReducer", () => {
    it("init", () => {
        expect(PushNotificationReducer()).toEqual(initialState);
    });
    it("PushNotification.PUSHNOTIFICATION_SUBSCRIBE", () => {
        const ex = PushNotificationReducer(initialState,
            {
                type: PushNotification.PUSHNOTIFICATION_SUBSCRIBE,
                id: "mastodon.server.net:ACCEESS_TOKEN",
                subscribeID: pushNotificationMock["mastodon.server.net:ACCEESS_TOKEN"].subscribeID,
                expoToken: pushNotificationMock["mastodon.server.net:ACCEESS_TOKEN"].expoToken,
                accessToken: pushNotificationMock["mastodon.server.net:ACCEESS_TOKEN"].accessToken,
                server: pushNotificationMock["mastodon.server.net:ACCEESS_TOKEN"].server
            }
        );
        expect(ex).toEqual(pushNotificationMock);
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
                pushNotifications: pushNotificationMock
            }
        );
        expect(ex).toEqual(pushNotificationMock);
    });
    it("PushNotification.PUSHNOTIFICATION_RESET", () => {
        const ex = PushNotificationReducer(pushNotificationMock, { type: PushNotification.PUSHNOTIFICATION_RESET });
        expect(ex).toEqual(initialState);
    });
});