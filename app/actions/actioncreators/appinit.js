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
const TIMELINE_LOCAL_AUTOLOAD = true; // Timeline Local Auto Load (Experimental)
const TIMELINE_LOCAL_LIMIT = 50; // Timeline Local Data Limit
//タイムラインが古くなってしまった場合、キャッシュを削除
const TIMELINE_LOCAL_EXPIRED = 600; // Timeline Local Data Expired (sec)

export function appInit() {
    return async dispatch => {
        let timeline_cache = null;
        if (TIMELINE_LOCAL_AUTOLOAD) {
            let last_update = await AsyncStorage.getItem("last_update");
            let timeline_cache_json = await AsyncStorage.getItem("timeline_cache");
            timeline_cache = timelineLoadSetting(last_update, timeline_cache_json);
        }
        await dispatch({
            type: Main.GETLOCALDATA_MASTOLIST,
            data: timeline_cache
        });

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

function timelineLoadSetting(last_update, timeline_cache_json) {
    if (last_update === null || timeline_cache_json === null) {
        return null;
    }
    if (parseInt(last_update) + TIMELINE_LOCAL_EXPIRED * 1000 < new Date().getTime()) {
        return null;
    }
    let timeline_cache = JSON.parse(timeline_cache_json);
    for (let type in timeline_cache) {
        timeline_cache[type].data = timeline_cache[type].data.slice(0, TIMELINE_LOCAL_LIMIT);
        let { minId, maxId } = getMinMaxId(null, null, timeline_cache[type].data);
        timeline_cache[type].minId = minId;
        timeline_cache[type].maxId = maxId;
    }
    return timeline_cache;
}
