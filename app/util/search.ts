import * as Session from "../util/session";
import * as Rest from "../services/api/Rest";

export async function search(q: string, type:string){
    try {
        let { sns, domain, access_token } = await Session.getDomainAndToken();
        const data = await Rest.search(sns, domain, access_token, q, type as "accounts" | "hashtags" | "statuses");
        return { data, error: null };
    } catch (e){
        return { data: {
            accounts: [],
            statuses: [],
            hashtags: [],
        }, error: e.message };
    }
}