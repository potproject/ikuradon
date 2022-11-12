import * as Rest from "../services/api/Rest";
import * as Session from "../util/session";

export async function getEmojis() {
    try {
        let { sns, domain } = await Session.getDomainAndToken();
        const emojis = await Rest.getInstanceCustomEmojis(sns, domain);
        return { emojis, error: null };
    } catch (e) {
        return { emojis: [], error: e.message };
    }
}

export function getDefaultReaction() {
    const defaultEmoji = ["👍", "❤️", "😆", "🤔", "😮", "🎉", "💢", "😥", "😇", "🍮"];
    return defaultEmoji.map((emoji) => {
        return {
            shortcode: emoji,
            static_url: "",
            url: "",
            visible_in_picker: false
        };
    });
}
