import { Alert, AsyncStorage } from "react-native";
import * as Mastorow from "../actiontypes/mastorow";
import * as Nav from "../actiontypes/nav";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";

export function boost(id, tootid, boosted) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted });
            let domain = await AsyncStorage.getItem("domain");
            let access_token = await AsyncStorage.getItem("access_token");
            let POST_URL = boosted ? CONST_API.POST_REBLOG : CONST_API.POST_UNREBLOG;
            let data = await Networking.fetch(domain, POST_URL, tootid, {}, access_token);
        } catch (e) {
            console.error(e);
            dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted:!boosted });
            return;
        }
        return;
    };
}

export function favourite(id, tootid, favourited) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.FAVOURITE_MASTOROW, id, favourited });
            let domain = await AsyncStorage.getItem("domain");
            let access_token = await AsyncStorage.getItem("access_token");
            let POST_URL = favourited ? CONST_API.POST_FAVOURITED : CONST_API.POST_UNFAVOURITED;
            let data = await Networking.fetch(domain, POST_URL, tootid, {}, access_token);
        } catch (e) {
            console.error(e);
            dispatch({ type: Mastorow.FAVOURITE_MASTOROW, id, favourited:!favourited });
            return;
        }
        return;
    };
}

export function mediaOpen(media_attachments, index) {
    return { type: Nav.NAV_MEDIAVIEWER ,media_attachments ,index };

}