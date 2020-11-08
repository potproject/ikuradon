import * as CONST_API from "../../constants/api";
import Networking from "../../services/Networking";
import * as Detail from "../actiontypes/detail";

import t from "../../services/I18n";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import DropDownHolder from "../../services/DropDownHolder";

export function openDetail(id) {
    console.log(id);
    return async dispatch => {
        try {
            NavigationService.navigate({ name: RouterName.Detail });
            dispatch({ type: Detail.DETAIL_OPEN });
        } catch (e) {
            DropDownHolder.error(t("Errors_error"), e.message);
        }
    };
}

