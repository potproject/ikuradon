import { getMisskeyCustomEmojiReaction, isReactioned } from "../reactions";

describe("Util/reactions", () => {
    it("getMisskeyCustomEmojiReaction", () => {
        const r = getMisskeyCustomEmojiReaction(
            {
                count: 1,
                me: false,
                name: "👍",
                accounts: [],
            },
            [{ shortcode: "👍", static_url: "STATIC_URL", url: "URL", visible_in_picker: true }]
        );
        expect(r).toEqual({ "count": 1, "emoji": "👍", "me": false, "url": "URL" });
        const r2 = getMisskeyCustomEmojiReaction(
            {
                count: 2,
                me: false,
                name: ":test@misskey.io:",
                accounts: [],
            },
            [{ shortcode: "test@misskey.io", static_url: "STATIC_URL", url: "URL", visible_in_picker: true }]
        );
        expect(r2).toEqual({ "count": 2, "emoji": ":test@misskey.io:", "me": false, "url": "URL" });
    });
    it("isReactioned", () => {
        const r = isReactioned([
            {
                count: 1,
                me: true,
                name: "👍",
                accounts: [],
            },
        ]);
        expect(r).toBeTruthy();
        const r2 = isReactioned([
            {
                count: 1,
                me: false,
                name: "👍",
                accounts: [],
            },
        ]);
        expect(r2).toBeFalsy();
    });
});
