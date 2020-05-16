import * as CONST_API from "../../constants/api";
import Networking from "../../services/Networking";
import * as Session from "../../util/session";
import * as CurrentUser from "../actiontypes/currentuser";
import t from "../../services/I18n";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import * as Nav from "../actiontypes/nav";
import DropDownHolder from "../../services/DropDownHolder";

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
            let instance = await Networking.fetch(domain, CONST_API.GET_INSTANCE, null, {}, access_token);
            let username = user_credentials.acct;
            let avatar = user_credentials.avatar;
            await Session.add(domain, access_token, username, avatar);
            DropDownHolder.success(t("messages.login_success"));
            dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token, instance });
            NavigationService.resetAndNavigate({ name: RouterName.Main });
        } catch (e) {
            DropDownHolder.error(t("Errors_error"), e.message);
        }
    };
}
