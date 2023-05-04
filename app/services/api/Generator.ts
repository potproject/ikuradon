import generator from "megalodon";
import blueSkyGenerator from "./Bluesky/Generetor";

export default function generatorBase(sns: "mastodon"|"pleroma"|"misskey"|"bluesky", baseUrl: string, access_token: string = "") {
    if (sns === "bluesky") {
        const bsky = new blueSkyGenerator(baseUrl, access_token);
        return bsky;
    }
    return generator(sns, baseUrl, access_token);
}