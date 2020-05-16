import * as Main from "../actiontypes/main";
import * as Config from "../actiontypes/config";
import { AsyncStorage } from "react-native";
import { getMinMaxId } from "../../util/manageid";
import * as Session from "../../util/session";
//import Font from "../../services/font";

import * as CONST_API from "../../constants/api";
import Networking from "../../services/Networking";
import * as CurrentUser from "../actiontypes/currentuser";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import * as Nav from "../actiontypes/nav";
import * as AppInit from "../actiontypes/appinit";

const AUTO_LOGIN = true; // Auto Login

export function appInit() {
    return async dispatch => {

        //config init load
        let configstr = await AsyncStorage.getItem("config");
        let config = JSON.parse(configstr);
        if (config !== null) {
            await dispatch({ type: Config.CONFIG_LOAD, config });
        }
        //Session init
        await Session.init();
        //fontload init
        //await Font.init();

        //ここにトークンが生きてるか判断させる
        let { domain, access_token } = await Session.getDomainAndToken();
        if (AUTO_LOGIN && access_token && domain) {
            try {
                let user_credentials = await Networking.fetch(domain, CONST_API.GET_CURRENT_USER, null, {}, access_token);
                let instance = await Networking.fetch(domain, CONST_API.GET_INSTANCE, null, {}, access_token);
                dispatch({ type: CurrentUser.UPDATE_CURRENT_USER, user_credentials, domain, access_token, instance });
                await dispatch({ type:AppInit.APPINIT_COMPLETE });
                NavigationService.resetAndNavigate({ name: RouterName.Main });
                dispatch({ type: Nav.NAV_MAIN });
                return;
            } catch (e) {
                //LOGIN ERROR!
                await Session.setDefault();
            }
        }
        await dispatch({ type:AppInit.APPINIT_COMPLETE });
        NavigationService.resetAndNavigate({ name: RouterName.Login });
        dispatch({ type: Nav.NAV_LOGIN });
    };
}