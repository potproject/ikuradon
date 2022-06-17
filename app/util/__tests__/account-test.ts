import { accountURLMigrate, urlMigrate } from "../account";

describe("Util/Misskey", () => {
    it("accountURLMigrate", () => {
        expect(accountURLMigrate("mastodon", "mastodon.example.net", "https://mastodon.example.net/test")).toEqual("https://mastodon.example.net/test");
        expect(accountURLMigrate("misskey", "misskey.example.net", "test@misskey.example.net")).toEqual("https://misskey.example.net/@test");
        expect(accountURLMigrate("misskey", "misskey.example.net", "test")).toEqual("https://misskey.example.net/@test");
    });
    it("urlMigrate", () => {
        expect(urlMigrate("mastodon", "mastodon.example.net", "https://mastodon.example.net/@test/1234567890", "1234567890")).toEqual("https://mastodon.example.net/@test/1234567890");
        expect(urlMigrate("misskey", "misskey.example.net", "", "1234567890")).toEqual("https://misskey.example.net/notes/1234567890");
    });
});