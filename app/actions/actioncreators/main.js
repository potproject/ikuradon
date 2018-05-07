import * as Main from "../actiontypes/main";
import * as Nav from "../actiontypes/nav";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";

const reducerTypeArray = {
    home: CONST_API.GET_TIMELINES_HOME,
    local:CONST_API.GET_TIMELINES_LOCAL,
    federal:CONST_API.GET_TIMELINES_FEDERAL,
    notifications:CONST_API.GET_NOTIFICATIONS
};

export function toot() {
    return { type: Nav.NAV_TOOT };
}

export function reply(id, tootid, user, acct, image, body){
    return { type: Nav.NAV_TOOT_REPLY , data: {id, tootid, user, acct, image, body} };
}

export function hide(id) {
    return { type: Main.HIDE_MASTOLIST, id: id };
}

export function newLoadingTimeline(reducerType,since_id, limit = 40) {
    return async dispatch => {
        dispatch({ type: Main.REFRESHING_MASTOLIST , reducerType });
        let data;
        try {
            let { domain, access_token } = await Session.getDomainAndToken();
            data = await Networking.fetch(domain,  reducerTypeArray[reducerType], null,{ limit, since_id, max_id:null }, access_token);
            dispatch({ type: Main.NEW_UPDATE_MASTOLIST, data: data , reducerType });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.network_error"),
                message: e.message,
                alertType: "error",
            });
        }
    };
}

export function oldLoadingTimeline(reducerType, max_id, limit = 40) {
    return async dispatch => {
        dispatch({ type: Main.REFRESHING_MASTOLIST , reducerType });
        let data;
        try {
            let { domain, access_token } = await Session.getDomainAndToken();
            data = await Networking.fetch(domain,  reducerTypeArray[reducerType], null,{ limit, since_id:null, max_id }, access_token);
            dispatch({ type: Main.OLD_UPDATE_MASTOLIST, data: data , reducerType });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.network_error"),
                message: e.message,
                alertType: "error",
            });
        }
    };
}