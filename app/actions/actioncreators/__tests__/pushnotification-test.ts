import { subscribe, unsubscribe } from "../pushnotification";

import * as PushNotification from "../../actiontypes/pushnotification";

import ExampleSession from "../../../example/session";

import { grantNotifications } from "../../../util/push";
import Networking from "../../../services/Networking";

import { getExpoPushTokenAsync } from "expo-notifications";

import DropDownHolder from "../../../services/DropDownHolder";

jest.mock("../../../services/Networking");
jest.mock("../../../util/push");
jest.mock("expo-notifications");
jest.mock("../../../services/DropDownHolder", () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

class AxiosMockError extends Error {
    constructor(message = "", ...args) {
        super(message, ...args);
        this.message = message;
        this.request = args[0];
        this.response = args[1];
        this.code = args[2];
    }
}

describe("Action/PushNotification", () => {
    it("subscribe", async done => {
        grantNotifications.mockImplementation(() => true);
        getExpoPushTokenAsync.mockImplementation(()=>({ data: "Expo[TOKEN]" }));
        Networking.pushServer.mockImplementation(() => ({
            data:{
                subscribe_id: "SUBSCRIBE_ID"
            }
        }));
        const { domain, access_token } = ExampleSession();
        let action = subscribe("mastodon", domain, access_token);
        await action((callback) => {
            try {
                expect(callback).toEqual({
                    type: PushNotification.PUSHNOTIFICATION_SUBSCRIBE,
                    id: "mastodon.server.net:ACCEESS_TOKEN",
                    subscribeID: "SUBSCRIBE_ID",
                    expoToken: "Expo[TOKEN]",
                    accessToken: "ACCEESS_TOKEN",
                    server: "salmon.potproject.net"
                });
                done();
            } catch (e){
                done(e);
            }
        });
        grantNotifications.mockReset();
        getExpoPushTokenAsync.mockReset();
        Networking.pushServer.mockReset();
    });
    it("subscribe granted denied", async () => {
        grantNotifications.mockImplementation(() => false);
        const { domain, access_token } = ExampleSession();
        let action = subscribe(domain, access_token);
        await action(() => null);
        grantNotifications.mockReset();
    });
    it("subscribe fail", async done => {
        grantNotifications.mockImplementation(() => true);
        getExpoPushTokenAsync.mockImplementation(()=>({ data: "Expo[TOKEN]" }));
        Networking.pushServer.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        const { domain, access_token } = ExampleSession();
        let action = subscribe(domain, access_token);
        await action(() => null);
        grantNotifications.mockReset();
        getExpoPushTokenAsync.mockReset();
        Networking.pushServer.mockReset();
        DropDownHolder.error.mockReset();
    });
    it("subscribe invalid response", async done => {
        grantNotifications.mockImplementation(() => true);
        getExpoPushTokenAsync.mockImplementation(()=>({ data: "Expo[TOKEN]" }));
        Networking.pushServer.mockImplementation(() => ({}));
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Invalid Server Param.");
            done();
        });
        const { domain, access_token } = ExampleSession();
        let action = subscribe(domain, access_token);
        await action(() => null);
        grantNotifications.mockReset();
        getExpoPushTokenAsync.mockReset();
        Networking.pushServer.mockReset();
        DropDownHolder.error.mockReset();
    });
    it("unsubscribe", async done => {
        grantNotifications.mockImplementation(() => true);
        getExpoPushTokenAsync.mockImplementation(()=>({ data: "Expo[TOKEN]" }));
        Networking.pushServer.mockImplementation(() => ({
            data:{
                subscribe_id: "SUBSCRIBE_ID"
            }
        }));
        const { domain, access_token } = ExampleSession();
        let action = unsubscribe("mastodon", domain, access_token);
        await action((callback) => {
            try {
                expect(callback).toEqual({
                    type: PushNotification.PUSHNOTIFICATION_UNSUBSCRIBE,
                    id: "mastodon.server.net:ACCEESS_TOKEN"
                });
                done();
            } catch (e){
                done(e);
            }
        });
        grantNotifications.mockReset();
        getExpoPushTokenAsync.mockReset();
        Networking.pushServer.mockReset();
    });
    it("unsubscribe granted denied", async () => {
        grantNotifications.mockImplementation(() => false);
        const { domain, access_token } = ExampleSession();
        let action = unsubscribe(domain, access_token);
        await action(() => null);
        grantNotifications.mockReset();
    });
    it("unsubscribe 404", async done => {
        grantNotifications.mockImplementation(() => true);
        getExpoPushTokenAsync.mockImplementation(()=>({ data: "Expo[TOKEN]" }));
        Networking.pushServer.mockImplementation(() => {
            throw new AxiosMockError("Not Found", {}, { status: 404 }, 404);
        });
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Not Found");
            done();
        });
        const { domain, access_token } = ExampleSession();
        let action = unsubscribe("mastodon", domain, access_token);
        await action((callback) => {
            try {
                expect(callback).toEqual({
                    type: PushNotification.PUSHNOTIFICATION_UNSUBSCRIBE,
                    id: "mastodon.server.net:ACCEESS_TOKEN"
                });
            } catch (e){
                done(e);
            }
        });
        grantNotifications.mockReset();
        getExpoPushTokenAsync.mockReset();
        Networking.pushServer.mockReset();
        DropDownHolder.error.mockReset();
    });
    it("unsubscribe fail", async done => {
        grantNotifications.mockImplementation(() => true);
        getExpoPushTokenAsync.mockImplementation(()=>({ data: "Expo[TOKEN]" }));
        Networking.pushServer.mockImplementation(() => {
            throw new Error("Network Error");
        });
        DropDownHolder.error.mockImplementationOnce((title, message) => {
            expect(message).toEqual("Network Error");
            done();
        });
        const { domain, access_token } = ExampleSession();
        let action = unsubscribe(domain, access_token);
        await action(() => null);
        grantNotifications.mockReset();
        getExpoPushTokenAsync.mockReset();
        Networking.pushServer.mockReset();
        DropDownHolder.error.mockReset();
    });
});