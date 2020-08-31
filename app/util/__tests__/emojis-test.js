import { getEmojis } from "../../util/emojis";
import { emojis } from "./example";
import Networking from "../../services/Networking";
jest.mock("../../services/Networking");

describe("Util/Emojis", () => {
    it("getEmojis", async () => {
        Networking.fetch.mockImplementation(() => emojis);
        expect(await getEmojis("mastodon.test.com")).toEqual({ emojis: emojis, error: null });
        Networking.fetch.mockClear();
    });
    it("getEmojis Network Error", async () => {
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await getEmojis("mastodon.test.com")).toEqual({ emojis: [], error: "Network Error" });
        Networking.fetch.mockClear();
    });
});