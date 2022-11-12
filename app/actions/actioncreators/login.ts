import * as Main from "../actiontypes/main";
import * as Streaming from "../actiontypes/streaming";
import * as Session from "../../util/session";
import * as CurrentUser from "../actiontypes/currentuser";
import t from "../../services/I18n";

import * as Rest from "../../services/api/Rest";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import DropDownHolder from "../../services/DropDownHolder";

export function login(domain) {
    return async dispatch => {
        try {
            await dispatch({ type: Streaming.STREAM_ALLSTOP });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
            const appData = await Rest.createApp("mastodon", domain, "ikuradon", ["read", "write", "follow", "push"], "urn:ietf:wg:oauth:2.0:oob");
            const url = createUrl(domain, appData.client_id);
            const { client_id, client_secret } = appData;
            //この時点ではまだログインしていません
            NavigationService.navigate({ name: RouterName.Authorize, params: { domain, url, client_id, client_secret } });
        } catch (e) {
            DropDownHolder.error(t("Errors_error"), e.message);
        }
    };
}

export function loginSelectAccounts(index) {
    return async dispatch => {
        await Session.setIndex(index);
        let { sns, domain, access_token } = await Session.getDomainAndToken();
        if (access_token && domain) {
            try {
                await dispatch({ type: Streaming.STREAM_ALLSTOP });
                await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
                const user_credentials = await Rest.getCurrentUser(sns, domain, access_token);
                const instance = await Rest.getInstance(sns, domain, access_token);
                await dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, sns, user_credentials, domain, access_token, instance });
                NavigationService.resetAndNavigate({ name: RouterName.Main });
                return;
            } catch (e) {
                //LOGIN ERROR!
                await Session.setDefault();
            }
        }
        NavigationService.resetAndNavigate({ name: RouterName.Login });
    };
}

export function loginWithAccessToken(sns, domain, access_token) {
    return async dispatch => {
        try {
            //アクセストークンでログイン
            await dispatch({ type: Streaming.STREAM_ALLSTOP });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
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

export function logout() {
    return async dispatch => {
        try {
            await Session.deleteCurrentItems();
            await dispatch({ type: Streaming.STREAM_ALLSTOP });
            await dispatch({ type: CurrentUser.DELETED_CURRENT_USER });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
            DropDownHolder.success(t("messages.logout_success"));
            NavigationService.resetAndNavigate({ name: RouterName.Login });
        } catch (e) {
            DropDownHolder.error(t("Errors_error"), e.message);
        }
    };
}

export function accountChange() {
    return async dispatch => {
        try {
            await Session.setDefault();
            await dispatch({ type: Streaming.STREAM_ALLSTOP });
            await dispatch({ type: CurrentUser.DELETED_CURRENT_USER });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
            DropDownHolder.success(t("login_success"));
            NavigationService.resetAndNavigate({ name: RouterName.Login });
        } catch (e) {
            DropDownHolder.error(t("Errors_error"), e.message);
        }
    };
}

export function accountChangeWithDelete(index) {
    return async dispatch => {
        await Session.deleteItems(index);
        await Session.setIndex(0);
        let { sns, domain, access_token } = await Session.getDomainAndToken();
        if (access_token && domain) {
            try {
                await dispatch({ type: Streaming.STREAM_ALLSTOP });
                await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
                const user_credentials = await Rest.getCurrentUser(sns, domain, access_token);
                const instance = await Rest.getInstance(sns, domain, access_token);
                await dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, sns, user_credentials, domain, access_token, instance });
                NavigationService.resetAndNavigate({ name: RouterName.Main });
                return;
            } catch (e) {
                //LOGIN ERROR!
                await Session.setDefault();
            }
        }
        NavigationService.resetAndNavigate({ name: RouterName.Login });
    };
}

function createUrl(domain, client_id) {
    return `https://${domain}/oauth/authorize?` + `client_id=${client_id}&` + "response_type=code&" + "redirect_uri=urn:ietf:wg:oauth:2.0:oob&" + "scope=read%20write%20follow%20push";
}
