import { grantNotifications, pull } from "../../util/push";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

jest.mock("react-native", () => ({
    Platform: {},
    Vibration: {
        vibrate: jest.fn()
    }
}));

jest.mock("expo-device", () => ({
    isDevice: true,
}));

jest.mock("expo-notifications", () => ({
    addNotificationReceivedListener: jest.fn(),
    setNotificationChannelAsync: jest.fn(),
    getPermissionsAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
    AndroidImportance: { "DEFAULT":1 }
}));

jest.mock("../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn()
}));

describe("Util/Permission", () => {
    it("grantNotifications get:granted Android", async () => {
        Device.isDevice = true;
        Platform.OS = "android";
        Notifications.getPermissionsAsync.mockImplementation(() => { return { status: "granted" }});
        Notifications.requestPermissionsAsync.mockImplementation(() => { return { status: "granted" }});
        const result = await grantNotifications();
        expect(result).toEqual(true);
        Notifications.getPermissionsAsync.mockClear();
        Notifications.requestPermissionsAsync.mockClear();
    });
    it("grantNotifications get:granted iOS", async () => {
        Device.isDevice = true;
        Platform.OS = "ios";
        Notifications.getPermissionsAsync.mockImplementation(() => { return { status: "granted" }});
        Notifications.requestPermissionsAsync.mockImplementation(() => { return { status: "granted" }});
        const result = await grantNotifications();
        expect(result).toEqual(true);
        Notifications.getPermissionsAsync.mockClear();
        Notifications.requestPermissionsAsync.mockClear();
    });
    it("grantNotifications ask:granted", async () => {
        Device.isDevice = true;
        Platform.OS = "ios";
        Notifications.getPermissionsAsync.mockImplementation(() => { return { status: "denied" }});
        Notifications.requestPermissionsAsync.mockImplementation(() => { return { status: "granted" }});
        const result = await grantNotifications();
        expect(result).toEqual(true);
        Notifications.getPermissionsAsync.mockClear();
        Notifications.requestPermissionsAsync.mockClear();
    });
    it("grantNotifications ask:denied", async () => {
        Device.isDevice = true;
        Platform.OS = "ios";
        Notifications.getPermissionsAsync.mockImplementation(() => { return { status: "denied" }});
        Notifications.requestPermissionsAsync.mockImplementation(() => { return { status: "denied" }});
        const result = await grantNotifications();
        expect(result).toEqual(false);
        Notifications.getPermissionsAsync.mockClear();
        Notifications.requestPermissionsAsync.mockClear();
    });
    it("grantNotifications not supported", async () => {
        Device.isDevice = false;
        Platform.OS = "web";
        const result = await grantNotifications();
        expect(result).toEqual(false);
    });
    it("pull iOS", () => {
        Device.isDevice = true;
        Platform.OS = "ios";
        pull();
    });
    it("pull Android with Listener", done => {
        Device.isDevice = true;
        Platform.OS = "android";
        const notification = { request:{ content:{ title: "title", body: "body" } } };
        Notifications.addNotificationReceivedListener.mockImplementation((callback) => {
            callback(notification);
            callback(null);
            done();
        });
        pull();
    });
});