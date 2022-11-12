import { getRelationship } from "../../util/relationships";
import * as Session from "../../util/session";
import ExampleSession from "../../example/session";
import ExampleRelationships from "../../example/relationships";

import * as Rest from "../../services/api/Rest";
jest.mock("../../services/api/Rest");

jest.mock("../../util/session", () => ({
    getDomainAndToken: jest.fn(),
}));

describe("Util/Relationship", () => {
    it("getRelationship", async () => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.getRelationships.mockImplementation(() => [ExampleRelationships()]);
        expect(await getRelationship(1)).toEqual({ "data": ExampleRelationships(), "error": null });
        Session.getDomainAndToken.mockClear();
        Rest.getRelationships.mockClear();
    });
    it("getRelationship Notfound", async () => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.getRelationships.mockImplementation(() => []);
        expect(await getRelationship(1)).toEqual({ "data": null, "error": "Account ID: 1 Not Found" });
        Session.getDomainAndToken.mockClear();
        Rest.getRelationships.mockClear();
    });
    it("getRelationship Network Error", async () => {
        Session.getDomainAndToken.mockImplementation(()=> ExampleSession());
        Rest.getRelationships.mockImplementation(() => {
            throw new Error("Network Error");
        });
        expect(await getRelationship(1)).toEqual({ "data": null, "error": "Network Error" });
        Session.getDomainAndToken.mockClear();
        Rest.getRelationships.mockClear();
    });
});