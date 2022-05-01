import * as CONST_API from "../constants/api";
import Networking from "../services/Networking";

export async function getEmojis(domain){
    try {
        let { data:emojis } = await Networking.fetch(domain, CONST_API.GET_CUSTOMEMOJIS);
        return { emojis, error: null };
    } catch (e){
        return { emojis: [], error: e.message };
    }
}