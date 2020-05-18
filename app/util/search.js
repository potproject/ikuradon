import * as CONST_API from "../constants/api";
import Networking from "../services/Networking";
import * as Session from "../util/session";

export async function search(q){
    try {
        let { domain, access_token } = await Session.getDomainAndToken();
        let search = await Networking.fetch(domain, CONST_API.GET_SEARCH_V2, null, { q }, access_token);
        return {search, error: null};
    }catch(e){
        return {search: {
            accounts: [],
            statuses: [],
            hashtags: [],
        }, error: e.message};
    }
}