import * as Rest from "../services/api/Rest";

export async function getEmojis(domain){
    try {
        const emojis = await Rest.getInstanceCustomEmojis("mastodon", domain);
        return { emojis, error: null };
    } catch (e){
        return { emojis: [], error: e.message };
    }
}