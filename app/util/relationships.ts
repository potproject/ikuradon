import * as Session from "../util/session";
import * as Rest from "../services/api/Rest";

export async function getRelationship(id){
    try {
        let { domain, access_token } = await Session.getDomainAndToken();

        const data = await Rest.getRelationships("mastodon", domain, access_token, [id]);
        if (data.length < 1){
            return { data: null, error: "Account ID: " +id+ " Not Found" };
        }
        return { data: data[0], error: null };
    } catch (e){
        return { data: null, error: e.message };
    }
}