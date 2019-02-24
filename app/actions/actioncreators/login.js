import { AsyncStorage } from "react-native";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import * as Main from "../actiontypes/main";
import * as Streaming from "../actiontypes/streaming";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";
import * as CurrentUser from "../actiontypes/currentuser";

import * as RouterName from "../../constants/routername";
import NavigationService from "../../navigationservice";
import * as Nav from "../actiontypes/nav";

export function login(domain) {
    return async dispatch => {
        let url, client_id, client_secret;
        try {
            let data = await Networking.fetch(domain, CONST_API.REGISTERING_AN_APPLICATION);
            url = createUrl(domain, data);
            client_id = data.client_id;
            client_secret = data.client_secret;
            //この時点ではまだログインしていません
            NavigationService.navigate({ routeName: RouterName.Authorize, params: { domain, url, client_id, client_secret } });
            dispatch({ type: Nav.NAV_AUTHORIZE });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.login_failed"),
                message: e.message,
                alertType: "error"
            });
        }
    };
}

export function loginSelectAccounts(index) {
    return async dispatch => {
        await Session.setIndex(index);
        let { domain, access_token } = await Session.getDomainAndToken();
        if (access_token && domain) {
            try {
                let user_credentials = await Networking.fetch(domain, CONST_API.GET_CURRENT_USER, null, {}, access_token);
                let instance = await Networking.fetch(domain, CONST_API.GET_INSTANCE, null, {}, access_token);
                dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token, instance });
                NavigationService.resetAndNavigate({ routeName: RouterName.Main });
                dispatch({ type: Nav.NAV_MAIN });
                return;
            } catch (e) {
                //LOGIN ERROR!
                await Session.setDefault();
            }
        }
        NavigationService.resetAndNavigate({ routeName: RouterName.login });
        dispatch({ type: Nav.NAV_LOGIN });
    };
}

export function loginWithAccessToken(domain, access_token) {
    return async dispatch => {
        try {
            //アクセストークンでログイン
            let user_credentials = await Networking.fetch(domain, CONST_API.GET_CURRENT_USER, null, {}, access_token);
            let instance = await Networking.fetch(domain, CONST_API.GET_INSTANCE, null, {}, access_token);
            let username = user_credentials.acct;
            let avatar = user_credentials.avatar;
            await Session.add(domain, access_token, username, avatar);
            MessageBarManager.showAlert({
                title: I18n.t("messages.login_success"),
                alertType: "success"
            });
            dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token, instance });
            NavigationService.resetAndNavigate({ routeName: RouterName.Main });
            dispatch({ type: Nav.NAV_MAIN });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.network_error"),
                message: e.message,
                alertType: "error"
            });
        }
    };
}

export function logout() {
    return async dispatch => {
        try {
            await Session.deleteCurrentItems();
            await AsyncStorage.removeItem("timeline_cache");
            await dispatch({ type: Streaming.STREAM_STOP });
            await dispatch({ type: CurrentUser.DELETED_CURRENT_USER });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
            MessageBarManager.showAlert({
                title: I18n.t("messages.logout_success"),
                alertType: "success"
            });
            NavigationService.resetAndNavigate({ routeName: RouterName.Login });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.logout_failed"),
                alertType: "error"
            });
        }
    };
}

export function accountChange() {
    return async dispatch => {
        try {
            await Session.setDefault();
            await AsyncStorage.removeItem("timeline_cache");
            await dispatch({ type: Streaming.STREAM_STOP });
            await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
            await dispatch({ type: CurrentUser.DELETED_CURRENT_USER });
            MessageBarManager.showAlert({
                title: I18n.t("messages.logout_success"),
                alertType: "success"
            });
            NavigationService.resetAndNavigate({ routeName: RouterName.Login });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.logout_failed"),
                alertType: "error"
            });
        }
    };
}

function createUrl(domain, data) {
    return `https://${domain}/oauth/authorize?` + `client_id=${data.client_id}&` + "response_type=code&" + "redirect_uri=urn:ietf:wg:oauth:2.0:oob&" + "scope=read%20write%20follow";
}
