import { getDefaultReaction, getEmojis } from "../../util/emojis";
import ExampleEmojis from "../../example/emojis";
import ExampleSession from "../../example/session";

import * as Session from "../../util/session";
import * as Rest from "../../services/api/Rest";
jest.mock("../../services/api/Rest");
jest.mock("../../util/session");

describe("Util/Emojis", () => {
    it("getEmojis", async () => {
        const emojis = ExampleEmojis();
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.getInstanceCustomEmojis.mockImplementation(() => emojis);
        expect(await getEmojis()).toEqual({ emojis: emojis, error: null });
        Rest.getInstanceCustomEmojis.mockClear();
        Session.getDomainAndToken.mockClear();
    });
    it("getEmojis Network Error", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.getInstanceCustomEmojis.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await getEmojis()).toEqual({ emojis: [], error: "Network Error" });
        Rest.getInstanceCustomEmojis.mockClear();
        Session.getDomainAndToken.mockClear();
    });
    it("getDefaultReaction", () => {
        getDefaultReaction();
    });
});
