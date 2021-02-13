import * as CONST_API from "../../constants/api";
import Networking from "../../services/Networking";
import * as Detail from "../actiontypes/detail";

import t from "../../services/I18n";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import DropDownHolder from "../../services/DropDownHolder";
import * as Session from "../../util/session";

export function getDetail(id) {
    return async dispatch => {
        NavigationService.navigate({ name: RouterName.Detail });
        try {
            let { domain, access_token } = await Session.getDomainAndToken();
            let data = await Networking.fetch(domain, CONST_API.GET_STATUS, id, {}, access_token);
            dispatch({ type: Detail.DETAIL_GET, data, loaded: true });
        } catch (e) {
            dispatch({ type: Detail.DETAIL_GET, data: {}, loaded: false });
            DropDownHolder.error(t("messages.detail_load_error"), e.message);
        }
    };
}

export function reloadDetail(id) {
    return async dispatch => {
        try {
            dispatch({ type: Detail.DETAIL_RESET });
            let { domain, access_token } = await Session.getDomainAndToken();
            let data = await Networking.fetch(domain, CONST_API.GET_STATUS, id, {}, access_token);
            dispatch({ type: Detail.DETAIL_GET, data, loaded: true });
        } catch (e) {
            dispatch({ type: Detail.DETAIL_GET, data: {}, loaded: false });
            DropDownHolder.error(t("messages.detail_load_error"), e.message);
        }
    };
}

export function resetDetail() {
    return { type: Detail.DETAIL_RESET };
}
