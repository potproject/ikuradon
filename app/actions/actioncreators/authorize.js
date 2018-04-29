import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import * as Nav from "../actiontypes/nav";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";

export function getAccessTokenWithHomeAction(domain, client_id, client_secret, code) {
    return async dispatch => {
        let access_token;
        try {
            let data = await Networking.fetch(domain, CONST_API.GET_OAUTH_ACCESSTOKEN,null, {
                client_id,
                client_secret,
                code,
            });
            access_token = data.access_token;
            await Session.add(domain,access_token);
            MessageBarManager.showAlert({
                title: I18n.t("messages.login_success"),
                alertType: "success",
            });
            dispatch({
                type: Nav.NAV_MAIN,
            });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.network_error"),
                message: e.message,
                alertType: "error",
            });
        }
    };
}

