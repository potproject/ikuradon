import * as Session from "../../util/session";
import * as CurrentUser from "../actiontypes/currentuser";
import t from "../../services/I18n";

import * as Rest from "../../services/api/Rest";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import DropDownHolder from "../../services/DropDownHolder";

export function getAccessTokenWithHomeAction(domain, client_id, client_secret, code) {
    return async dispatch => {
        try {
            const sns = "mastodon";
            const appData = await Rest.fetchAccessToken(sns, domain, client_id, client_secret, code, "urn:ietf:wg:oauth:2.0:oob");
            const { access_token } = appData;
            //get current user
            const user_credentials = await Rest.getCurrentUser(sns, domain, access_token);
            const instance = await Rest.getInstance(sns, domain, access_token);
            let username = user_credentials.acct;
            let avatar = user_credentials.avatar;
            await Session.add(sns, domain, access_token, username, avatar);
            DropDownHolder.success(t("messages.login_success"));
            dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, sns, user_credentials, domain, access_token, instance });
            NavigationService.resetAndNavigate({ name: RouterName.Main });
        } catch (e) {
            DropDownHolder.error(t("Errors_error"), e.message);
        }
    };
}
