import { search } from "../../util/search";
import Networking from "../../services/Networking";
import * as Session from "../../util/session";
import ExampleSession from "../../example/session";
import ExampleSearch from "../../example/search";

jest.mock("../../services/Networking", () => ({
    fetch: jest.fn(),
}));

jest.mock("../../util/session", () => ({
    getDomainAndToken: jest.fn(),
}));

describe("Util/Search", () => {
    it("search", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Networking.fetch.mockImplementation(() => ExampleSearch());
        expect(await search("test")).toEqual({ "data": ExampleSearch(), "error": null });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
    it("search Network Error", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await search("test")).toEqual({ "data": {
            accounts: [],
            statuses: [],
            hashtags: []
        }, "error": "Network Error" });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
});