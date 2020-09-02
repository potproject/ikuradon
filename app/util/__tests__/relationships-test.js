import { getRelationship } from "../../util/relationships";
import Networking from "../../services/Networking";
import * as Session from "../../util/session";
import ExampleSession from "../../example/session";
import ExampleRelationships from "../../example/relationships";

jest.mock("../../services/Networking", () => ({
    fetch: jest.fn(),
}));

jest.mock("../../util/session", () => ({
    getDomainAndToken: jest.fn(),
}));

describe("Util/Relationship", () => {
    it("getRelationship", async () => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation(() => [ExampleRelationships()]);
        expect(await getRelationship(1)).toEqual({ "data": ExampleRelationships(), "error": null });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
    it("getRelationship Notfound", async () => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation(() => []);
        expect(await getRelationship(1)).toEqual({ "data": {}, "error": "Account ID: 1 Not Found" });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
    it("getRelationship Network Error", async () => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Networking.fetch.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await getRelationship(1)).toEqual({ "data": {}, "error": "Network Error" });
        Session.getDomainAndToken.mockClear();
        Networking.fetch.mockClear();
    });
});