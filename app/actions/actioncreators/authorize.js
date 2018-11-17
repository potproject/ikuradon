import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import * as Nav from "../actiontypes/nav";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";
import * as CurrentUser from "../actiontypes/currentuser";

export function getAccessTokenWithHomeAction(domain, client_id, client_secret, code) {
    return async dispatch => {
        try {
            let data = await Networking.fetch(domain, CONST_API.GET_OAUTH_ACCESSTOKEN, null, {
                client_id,
                client_secret,
                code
            });
            let access_token = data.access_token;
            //get current user
            let user_credentials = await Networking.fetch(domain, CONST_API.GET_CURRENT_USER, null, {}, access_token);
            let username = user_credentials.acct;
            let avatar = user_credentials.avatar;
            await Session.add(domain, access_token, username, avatar);
            MessageBarManager.showAlert({
                title: I18n.t("messages.login_success"),
                alertType: "success"
            });
            dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token });
            dispatch({
                type: Nav.NAV_MAIN
            });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.network_error"),
                message: e.message,
                alertType: "error"
            });
        }
    };
}
