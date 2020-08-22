import PushNotificationReducer, { initialState } from "../pushnotification";

describe("PushNotificationReducer", () => {
    it("init", () => {
        expect(PushNotificationReducer()).toEqual(initialState);
    });
});