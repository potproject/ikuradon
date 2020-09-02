import { getBeforeAsk } from "../../util/permission";
import * as Permissions from "expo-permissions";

jest.mock("expo-permissions", () => ({
    getAsync: jest.fn(),
    askAsync: jest.fn(),
}));

describe("Util/Permission", () => {
    it("getBeforeAsk get:granted", async () => {
        Permissions.getAsync.mockImplementation(() => { return { getStatus: "granted" }});
        Permissions.askAsync.mockImplementation(() => { return { askStatus: "granted" }});
        expect(await getBeforeAsk(Permissions.NOTIFICATIONS)).toEqual(true);
        Permissions.getAsync.mockClear();
        Permissions.askAsync.mockClear();
    });
    it("getBeforeAsk ask:granted", async () => {
        Permissions.getAsync.mockImplementation(() => { return { getStatus: "denied" }});
        Permissions.askAsync.mockImplementation(() => { return { askStatus: "granted" }});
        expect(await getBeforeAsk(Permissions.NOTIFICATIONS)).toEqual(true);
        Permissions.getAsync.mockClear();
        Permissions.askAsync.mockClear();
    });
    it("getBeforeAsk ask:denied", async () => {
        Permissions.getAsync.mockImplementation(() => { return { getStatus: "denied" }});
        Permissions.askAsync.mockImplementation(() => { return { askStatus: "denied" }});
        expect(await getBeforeAsk(Permissions.NOTIFICATIONS)).toEqual(false);
        Permissions.getAsync.mockClear();
        Permissions.askAsync.mockClear();
    });
});