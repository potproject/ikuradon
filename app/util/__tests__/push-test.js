import { grantNotifications, pull } from "../../util/push";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

jest.mock("expo-permissions", () => ({
    getAsync: jest.fn(),
    askAsync: jest.fn(),
}));

jest.mock("expo-constants", () => ({
    isDevice: true,
}));

jest.mock("expo-notifications", () => ({
    addNotificationReceivedListener: jest.fn(),
    setNotificationChannelAsync: jest.fn(),
    AndroidImportance: { "DEFAULT":1 }
}));

jest.mock("../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn()
}));

describe("Util/Permission", () => {
    it("grantNotifications get:granted Android", async () => {
        Constants.isDevice = true;
        Platform.OS = "android";
        Permissions.getAsync.mockImplementation(() => { return { status: "granted" }});
        Permissions.askAsync.mockImplementation(() => { return { status: "granted" }});
        const result = await grantNotifications();
        expect(result).toEqual(true);
        Permissions.getAsync.mockClear();
        Permissions.askAsync.mockClear();
    });
    it("grantNotifications get:granted iOS", async () => {
        Constants.isDevice = true;
        Platform.OS = "ios";
        Permissions.getAsync.mockImplementation(() => { return { status: "granted" }});
        Permissions.askAsync.mockImplementation(() => { return { status: "granted" }});
        const result = await grantNotifications();
        expect(result).toEqual(true);
        Permissions.getAsync.mockClear();
        Permissions.askAsync.mockClear();
    });
    it("grantNotifications ask:granted", async () => {
        Constants.isDevice = true;
        Platform.OS = "ios";
        Permissions.getAsync.mockImplementation(() => { return { status: "denied" }});
        Permissions.askAsync.mockImplementation(() => { return { status: "granted" }});
        const result = await grantNotifications();
        expect(result).toEqual(true);
        Permissions.getAsync.mockClear();
        Permissions.askAsync.mockClear();
    });
    it("grantNotifications ask:denied", async () => {
        Constants.isDevice = true;
        Platform.OS = "ios";
        Permissions.getAsync.mockImplementation(() => { return { status: "denied" }});
        Permissions.askAsync.mockImplementation(() => { return { status: "denied" }});
        const result = await grantNotifications();
        expect(result).toEqual(false);
        Permissions.getAsync.mockClear();
        Permissions.askAsync.mockClear();
    });
    it("grantNotifications not supported", async () => {
        Constants.isDevice = false;
        Platform.OS = "web";
        const result = await grantNotifications();
        expect(result).toEqual(false);
    });
    it("pull Android", async () => {
        Constants.isDevice = true;
        Platform.OS = "android";
        pull();
    });
});