import { AsyncStorage } from "react-native";
import * as Mastorow from "../actiontypes/mastorow";
import * as Nav from "../actiontypes/nav";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";

export function boost(id, tootid, boosted) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted });
            let { domain, access_token } = await Session.getDomainAndToken();
            let POST_URL = boosted ? CONST_API.POST_REBLOG : CONST_API.POST_UNREBLOG;
            await Networking.fetch(domain, POST_URL, tootid, {}, access_token);
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.network_error"),
                message: e.message,
                alertType: "error",
            });
            dispatch({ type: Mastorow.BOOST_MASTOROW, id, boosted:!boosted });
        }
        return;
    };
}

export function favourite(id, tootid, favourited) {
    return async dispatch => {
        try {
            dispatch({ type: Mastorow.FAVOURITE_MASTOROW, id, favourited });
            let { domain, access_token } = await Session.getDomainAndToken();
            let POST_URL = favourited ? CONST_API.POST_FAVOURITED : CONST_API.POST_UNFAVOURITED;
            await Networking.fetch(domain, POST_URL, tootid, {}, access_token);
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.network_error"),
                message: e.message,
                alertType: "error",
            });
            dispatch({ type: Mastorow.FAVOURITE_MASTOROW, id, favourited:!favourited });
            return;
        }
        return;
    };
}

export function mediaOpen(media_attachments, index) {
    return { type: Nav.NAV_MEDIAVIEWER ,media_attachments ,index };

}