import { on, off } from "../../util/stream";

describe("Util/Stream", () => {
    it("on", () => {

    });
    it("off webSocket=On", () => {
        const dispatchMock = () => {};
        global.WebSocket = {
            OPEN:1
        };
        const webSocketMock = {
            current: {
                readyState: 1,
                close: () => null
            }
        };
        const useEnabledMock = () => null;
        off(webSocketMock, dispatchMock, useEnabledMock, "home");
    });
    it("off webSocket=Off", () => {
        const dispatchMock = () => {};
        const webSocketMock = { current: null };
        const useEnabledMock = () => null;
        off(webSocketMock, dispatchMock, useEnabledMock, "home");
    });
});