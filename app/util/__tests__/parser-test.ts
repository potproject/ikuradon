import { bodyFormat, bodyExtractionUrl, bodySearchUrl, dateFormat, emojisArrayToObject } from "../../util/parser";
import ExampleEmojis from "../../example/emojis";

describe("Util/Parser", () => {
    it("bodyFormat", () => {
        const body = "<p>&quot;I lost my inheritance with one wrong digit on my sort code&quot;</p><p><a href=\"https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">theguardian.com/money/2019/dec</span><span class=\"invisible\">/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code</span}</p>";
        const parsedBody = bodyFormat(body);
        expect(parsedBody).toEqual("\"I lost my inheritance with one wrong digit on my sort code\" https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code");
    });
    it("bodyExtractionUrl", () => {
        const body = "<p>&quot;I lost my inheritance with one wrong digit on my sort code&quot;</p><p><a href=\"https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">theguardian.com/money/2019/dec</span><span class=\"invisible\">/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code</span}</p>";
        const parsedBody = bodyExtractionUrl(body);
        expect(parsedBody).toEqual("https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code");
        const noBody = "";
        const parsedNoBody = bodyExtractionUrl(noBody);
        expect(parsedNoBody).toEqual(null);
    });
    it("bodySearchUrl", () => {
        const body = "<p>&quot;I lost my inheritance with one wrong digit on my sort code&quot;</p><p><a href=\"https://www.theguardian.com/money/2019/dec/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code\" rel=\"nofollow noopener noreferrer\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">theguardian.com/money/2019/dec</span><span class=\"invisible\">/07/i-lost-my-193000-inheritance-with-one-wrong-digit-on-my-sort-code</span}</p>";
        const isUrl = bodySearchUrl(body);
        expect(isUrl).toEqual(-90);
        const noBody = "";
        const isUrl2 = bodySearchUrl(noBody);
        expect(isUrl2).toEqual(0);
    });
    it("dateFormat", () => {
        expect(dateFormat("2020-09-01T10:20:30.400Z")).toEqual("2020/09/01 19:20:30");
    });
    it("emojisArrayToObject", () => {
        expect(emojisArrayToObject(ExampleEmojis())).toEqual(
            {
                "ms_bisexual_flag": { "uri": "https://files.mastodon.social/custom_emojis/images/000/050/744/original/02f94a5fca7eaf78.png" },
                "ms_nonbinary_flag": { "uri": "https://files.mastodon.social/custom_emojis/images/000/105/099/original/8106088bd4782072.png" },
                "ms_rainbow_flag": { "uri": "https://files.mastodon.social/custom_emojis/images/000/028/691/original/6de008d6281f4f59.png" }
            }
        );
    });
});