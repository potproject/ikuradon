import { on, off, getStreamingURL, streamSupported } from "../../util/stream";
import WS from "jest-websocket-mock";

import ExampleStatus from "../../example/status";

describe("Util/Stream", () => {
    it("streamSupported", () => {
        expect(streamSupported("mastodon")).toBeTruthy();
    });
    it("getStreamingURL Mastodon", () => {
        const sns = "mastodon";
        const url = "wss://server.mastodon.net";
        const accessToken = "ACCESS_TOKEN";
        const type1 = "federal";
        const type2 = "local";
        const type3 = "home";
        expect(getStreamingURL(sns, url, type1, accessToken)).toEqual("wss://server.mastodon.net/api/v1/streaming?access_token=ACCESS_TOKEN&stream=public");
        expect(getStreamingURL(sns, url, type2, accessToken)).toEqual("wss://server.mastodon.net/api/v1/streaming?access_token=ACCESS_TOKEN&stream=public:local");
        expect(getStreamingURL(sns, url, type3, accessToken)).toEqual("wss://server.mastodon.net/api/v1/streaming?access_token=ACCESS_TOKEN&stream=user");
    });
    it("getStreamingURL Misskey", () => {
        const sns = "misskey";
        const url = "wss://server.misskey.io";
        const accessToken = "ACCESS_TOKEN";
        const type = "home";
        expect(getStreamingURL(sns, url, type, accessToken)).toEqual("wss://server.misskey.io/streaming?i=ACCESS_TOKEN");
    });
    it("onMastodon", async () => {
        console.log = jest.fn();
        const url = "wss://server.mastodon.net/api/v1/streaming";
        const dispatchMock = (m) => {
            console.log(m);
        };
        const ref = {
            current: null
        };
        const useEnabledMock = () => null;
        const server = new WS(url, { jsonProtocol: true });

        // onOpen
        on("mastodon", ref, dispatchMock, useEnabledMock, "home", url);
        await server.connected;
        expect(ref.current.readyState).toBe(WebSocket.OPEN);

        // onMessage
        server.send({
            "event": "update",
            "payload": JSON.stringify(ExampleStatus())
        });

        // onMessage Empty (Invalid Body)
        server.send();

        // onError -> onClose
        server.error();
        await server.closed;
        console.log.mockClear();
    });

    it("onMisskey", async () => {
        console.log = jest.fn();
        const url = "wss://server.misskey.io/streaming";
        const dispatchMock = (m) => {
            console.log(m);
        };
        const ref = {
            current: null
        };
        const useEnabledMock = () => null;
        const server = new WS(url, { jsonProtocol: true });
        // onOpen
        on("misskey", ref, dispatchMock, useEnabledMock, "home", url);
        await server.connected;
        expect(ref.current.readyState).toBe(WebSocket.OPEN);

        // onMessage Empty (Invalid Body)
        server.send();

        // onError -> onClose
        server.error();
        await server.closed;
        console.log.mockClear();
    });
    it("offMastodon webSocket=On", () => {
        const dispatchMock = () => {};
        global.WebSocket = {
            OPEN:1
        };
        const refMock = {
            current: {
                readyState: 1,
                close: () => null
            }
        };
        const useEnabledMock = () => null;
        off("mastodon", refMock, dispatchMock, useEnabledMock, "home");
    });
    it("offMastodon webSocket=Off", () => {
        const dispatchMock = () => {};
        const refMock = { current: null };
        const useEnabledMock = () => null;
        off("mastodon", refMock, dispatchMock, useEnabledMock, "home");
    });
    it("offMisskey webSocket=On", () => {
        const dispatchMock = () => {};
        global.WebSocket = {
            OPEN:1
        };
        const refMock = {
            current: {
                readyState: 1,
                close: () => null,
                send: () => {},
            }
        };
        const useEnabledMock = () => null;
        off("misskey", refMock, dispatchMock, useEnabledMock, "home");
    });
    it("offMisskey webSocket=Off", () => {
        const dispatchMock = () => {};
        const refMock = { current: null };
        const useEnabledMock = () => null;
        off("misskey", refMock, dispatchMock, useEnabledMock, "home");
    });
});