import { notificationParse } from "../../util/notification";
import ExampleNotifications from "../../example/notifications";
describe("Util/notification", () => {
    it("notificationParse", () => {
        const ac = notificationParse(ExampleNotifications());
        console.log(ac);
    });
});