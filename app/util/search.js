import * as CONST_API from "../constants/api";
import Networking from "../services/Networking";
import * as Session from "../util/session";

export async function search(q){
    try {
        let { domain, access_token } = await Session.getDomainAndToken();
        let data = await Networking.fetch(domain, CONST_API.GET_SEARCH_V2, null, { q }, access_token);
        return {data, error: null};
    }catch(e){
        return {data: {
            accounts: [],
            statuses: [],
            hashtags: [],
        }, error: e.message};
    }
}