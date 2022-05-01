import { on, off, getStreamingURL } from "../../util/stream";
import WS from "jest-websocket-mock";
import { STREAMING } from "../../constants/api";

import ExampleStatus from "../../example/status";

describe("Util/Stream", () => {
    it("getStreamingURL", () => {
        const url = "wss://server.mastodon.net";
        const accessToken = "ACCESS_TOKEN";
        const type1 = "federal";
        const type2 = "local";
        const type3 = "home";
        expect(getStreamingURL(url, type1, accessToken)).toEqual("wss://server.mastodon.net/api/v1/streaming?access_token=ACCESS_TOKEN&stream=public");
        expect(getStreamingURL(url, type2, accessToken)).toEqual("wss://server.mastodon.net/api/v1/streaming?access_token=ACCESS_TOKEN&stream=public:local");
        expect(getStreamingURL(url, type3, accessToken)).toEqual("wss://server.mastodon.net/api/v1/streaming?access_token=ACCESS_TOKEN&stream=user");
    });
    it("on", async () => {
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
        on(ref, dispatchMock, useEnabledMock, "home", url);
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
    it("off webSocket=On", () => {
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
        off(refMock, dispatchMock, useEnabledMock, "home");
    });
    it("off webSocket=Off", () => {
        const dispatchMock = () => {};
        const refMock = { current: null };
        const useEnabledMock = () => null;
        off(refMock, dispatchMock, useEnabledMock, "home");
    });
});