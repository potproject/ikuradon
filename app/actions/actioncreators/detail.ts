import * as Detail from "../actiontypes/detail";

import t from "../../services/I18n";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import DropDownHolder from "../../services/DropDownHolder";
import * as Session from "../../util/session";
import * as Rest from "../../services/api/Rest";

export function getDetail(id) {
    return async dispatch => {
        NavigationService.navigate({ name: RouterName.Detail });
        try {
            let { sns, domain, access_token } = await Session.getDomainAndToken();
            const data = await Rest.getStatus(sns, domain, access_token, id);
            const { ancestors, descendants } = await Rest.getStatusContext(sns, domain, access_token, id);
            dispatch({ type: Detail.DETAIL_GET, ancestors, descendants, data, loaded: true });
        } catch (e) {
            dispatch({ type: Detail.DETAIL_GET, data: {}, loaded: false });
            DropDownHolder.error(t("messages.detail_load_error"), e.message);
        }
    };
}

export function resetDetail() {
    return { type: Detail.DETAIL_RESET };
}
