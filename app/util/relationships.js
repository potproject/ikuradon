import * as CONST_API from "../constants/api";
import Networking from "../services/Networking";
import * as Session from "../util/session";

export async function getRelationship(id){
    try {
        let { domain, access_token } = await Session.getDomainAndToken();
        let data = await Networking.fetch(domain, CONST_API.GET_RELATIONSHIPS, null, { id:[
            id
        ] }, access_token);
        if (data.length < 1){
            return { data: {}, error: "Account ID: " +id+ " Not Found" };
        }
        return { data: data[0], error: null };
    } catch (e){
        return { data: {}, error: e.message };
    }
}