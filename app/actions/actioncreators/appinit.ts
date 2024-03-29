import * as Config from "../actiontypes/config";
import * as PushNotification from "../actiontypes/pushnotification";
import * as OpenSticker from "../actiontypes/opensticker";
import * as Session from "../../util/session";
import * as Storage from "../../util/storage";

import * as CONST_Storage from "../../constants/storage";
import * as CurrentUser from "../actiontypes/currentuser";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import * as AppInit from "../actiontypes/appinit";
import { pull } from "../../util/push";
import * as Rest from "../../services/api/Rest";
import DropDownHolder from "../../services/DropDownHolder";
import t from "../../services/I18n";
import { refreshSession } from "../../services/api/Bluesky/Xrpc";

const AUTO_LOGIN = true; // Auto Login

export function appInit() {
    return async dispatch => {
        // config init load
        let config = await Storage.getItem(CONST_Storage.Config);
        if (config !== null) {
            await dispatch({ type: Config.CONFIG_LOAD, config });
        }

        // Push Notification load
        let pushNotifications = await Storage.getItem(CONST_Storage.Push);
        if (pushNotifications !== null) {
            await dispatch({ type: PushNotification.PUSHNOTIFICATION_LOAD, pushNotifications });
        }
        // Push Notification init Setting
        pull();

        // OpenSticker load
        let openSticker = await Storage.getItem(CONST_Storage.OpenSticker);
        if (openSticker !== null) {
            await dispatch({ type: OpenSticker.OPENSTICKER_LOAD, openSticker });
        }

        //Session init
        await Session.init();
        
        //ここにトークンが生きてるか判断させる
        let { sns, domain, access_token } = await Session.getDomainAndToken();
        if (AUTO_LOGIN && access_token && domain) {
            try {
                if (sns === "bluesky") {
                    const { refreshJwt } = JSON.parse(access_token);
                    access_token = await refreshSession("https://" + domain, refreshJwt);
                    await Session.refreshToken(access_token);
                }
                const user_credentials = await Rest.getCurrentUser(sns, domain, access_token);
                const instance = await Rest.getInstance(sns, domain, access_token);
                dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, sns, user_credentials, domain, access_token, instance });
                await dispatch({ type:AppInit.APPINIT_COMPLETE });
                NavigationService.resetAndNavigate({ name: RouterName.Main });
                return;
            } catch (e) {
                //LOGIN ERROR!
                DropDownHolder.error(t("messages.login_failed"), e.message);
            }
        }
        await dispatch({ type:AppInit.APPINIT_FAILED });
        NavigationService.resetAndNavigate({ name: RouterName.Login });
    };
}