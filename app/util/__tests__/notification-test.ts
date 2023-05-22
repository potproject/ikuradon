import { notificationParse } from "../../util/notification";
import ExampleNotifications from "../../example/notifications";
describe("Util/notification", () => {
    it("notificationParse", () => {
        const notifications = ExampleNotifications();
        const sns = "mastodon";
        const ac = notificationParse(sns, notifications);
        expect(ac.length).toEqual(3);
        expect(ac[0].id).toEqual("34975889");
        expect(ac[1].id).toEqual("34975861");
        expect(ac[2].id).toEqual("103270115826048975");
        expect(ac[2].favouriteAccounts.length).toEqual(2);
        expect(ac[2].boostAccounts.length).toEqual(1);
    });
});