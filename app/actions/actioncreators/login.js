import * as CONST_API from "../../constants/api";
import Networking from "../../services/Networking";
import * as Main from "../actiontypes/main";
import * as Streaming from "../actiontypes/streaming";
import * as Session from "../../util/session";
import * as CurrentUser from "../actiontypes/currentuser";
import t from "../../services/I18n";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import DropDownHolder from "../../services/DropDownHolder";

export function login(domain) {
    return async dispatch => {
        let url, client_id, client_secret;
        try {
            await dispatch({ type: Streaming.STREAM_ALLSTOP });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
            let data = await Networking.fetch(domain, CONST_API.REGISTERING_AN_APPLICATION);
            url = createUrl(domain, data);
            client_id = data.client_id;
            client_secret = data.client_secret;
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
        let { domain, access_token } = await Session.getDomainAndToken();
        if (access_token && domain) {
            try {
                await dispatch({ type: Streaming.STREAM_ALLSTOP });
                await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
                let user_credentials = await Networking.fetch(domain, CONST_API.GET_CURRENT_USER, null, {}, access_token);
                let instance = await Networking.fetch(domain, CONST_API.GET_INSTANCE, null, {}, access_token);
                await dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token, instance });
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

export function loginWithAccessToken(domain, access_token) {
    return async dispatch => {
        try {
            //アクセストークンでログイン
            await dispatch({ type: Streaming.STREAM_ALLSTOP });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
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
        let { domain, access_token } = await Session.getDomainAndToken();
        if (access_token && domain) {
            try {
                await dispatch({ type: Streaming.STREAM_ALLSTOP });
                await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
                let user_credentials = await Networking.fetch(domain, CONST_API.GET_CURRENT_USER, null, {}, access_token);
                let instance = await Networking.fetch(domain, CONST_API.GET_INSTANCE, null, {}, access_token);
                await dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token, instance });
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

function createUrl(domain, data) {
    return `https://${domain}/oauth/authorize?` + `client_id=${data.client_id}&` + "response_type=code&" + "redirect_uri=urn:ietf:wg:oauth:2.0:oob&" + "scope=read%20write%20follow%20push";
}
