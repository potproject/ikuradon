import { search } from "../../util/search";
import * as Session from "../../util/session";
import ExampleSession from "../../example/session";
import ExampleSearch from "../../example/search";

import * as Rest from "../../services/api/Rest";
jest.mock("../../services/api/Rest");

jest.mock("../../util/session", () => ({
    getDomainAndToken: jest.fn(),
}));

describe("Util/Search", () => {
    it("search", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.search.mockImplementation(() => ExampleSearch());
        expect(await search("test", "accounts")).toEqual({ "data": ExampleSearch(), "error": null });
        Session.getDomainAndToken.mockClear();
        Rest.search.mockClear();
    });
    it("search Network Error", async () => {
        Session.getDomainAndToken.mockImplementation(() => ExampleSession());
        Rest.search.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await search("test")).toEqual({ "data": {
            accounts: [],
            statuses: [],
            hashtags: []
        }, "error": "Network Error" });
        Session.getDomainAndToken.mockClear();
        Rest.search.mockClear();
    });
});