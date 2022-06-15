import { accountURLMigrate } from "../misskey";

describe("Util/Misskey", () => {
    it("accountURLMigrate", () => {
        expect(accountURLMigrate("https://mastodon.example.net/test")).toEqual("https://mastodon.example.net/test");
        expect(accountURLMigrate("test@misskey.example.net")).toEqual("https://misskey.example.net/@test");
    });
});