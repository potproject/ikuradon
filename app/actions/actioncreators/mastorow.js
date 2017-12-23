import { Alert, AsyncStorage } from "react-native";
import * as Mastorow from "../actiontypes/mastorow";
import * as Nav from "../actiontypes/nav";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";

export function boost(id, boosted) {
    return async dispatch => {
        try {
            let domain = await AsyncStorage.getItem("domain");
            let access_token = await AsyncStorage.getItem("access_token");
            let POST_URL = boosted ? CONST_API.POST_REBLOG : CONST_API.POST_UNREBLOG;
            let data = await Networking.fetch(domain, POST_URL, id, {}, access_token);
        } catch (e) {
            console.error(e);
            Alert.alert("エラー", "ブースト失敗っす");
            dispatch({
                type: Mastorow.BOOST_MASTOROW,
                id: null
            });
            return;
        }
        dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted });
        return;
    };
}

export function favourite(id, favourited) {
    return async dispatch => {
        try {
            let domain = await AsyncStorage.getItem("domain");
            let access_token = await AsyncStorage.getItem("access_token");
            let POST_URL = favourited ? CONST_API.POST_FAVOURITED : CONST_API.POST_UNFAVOURITED;
            let data = await Networking.fetch(domain, POST_URL, id, {}, access_token);
        } catch (e) {
            console.error(e);
            Alert.alert("エラー", "お気に入り失敗っす");
            dispatch({
                type: Mastorow.FAVOURITE_MASTOROW,
                id: null
            });
            return;
        }
        dispatch({ type: Mastorow.FAVOURITE_MASTOROW, id, favourited });
        return;
    };
}

export function mediaOpen(media_attachments, index) {
    return { type: Nav.NAV_MEDIAVIEWER ,media_attachments ,index };

}