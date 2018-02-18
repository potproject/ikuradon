import * as Nav from "../actiontypes/nav";
import * as Main from "../actiontypes/main";
import { AsyncStorage } from "react-native";
import { getMinMaxId } from "../../util/manageid";
import I18n from "../../i18n";

const AUTO_LOGIN = true; // Auto Login
const TIMELINE_LOCAL_AUTOLOAD = true; // Timeline Local Auto Load (Experimental)
const TIMELINE_LOCAL_LIMIT = 50; // Timeline Local Data Limit
//タイムラインが古くなってしまった場合、キャッシュを削除
const TIMELINE_LOCAL_EXPIRED = 600; // Timeline Local Data Expired (sec)

export function appInit() {
    return async dispatch => {
        const access_token = await AsyncStorage.getItem("access_token");
        const domain = await AsyncStorage.getItem("domain");

        let timeline_cache = null;
        if(TIMELINE_LOCAL_AUTOLOAD){
            let last_update = await AsyncStorage.getItem("last_update");
            let timeline_cache_json = await AsyncStorage.getItem("timeline_cache");
            timeline_cache = timelineLoadSetting(last_update,timeline_cache_json);
        }
        await dispatch({
            type: Main.GETLOCALDATA_MASTOLIST,
            data: timeline_cache
        });

        await I18n.init();
        //ここにトークンが生きてるか判断させる
        if (AUTO_LOGIN && access_token && domain) {
            dispatch({
                type: Nav.NAV_MAIN,
                access_token,
                domain
            });
            return;
        }
        dispatch({ type: Nav.NAV_LOGIN });
        return;
    };
}

function timelineLoadSetting(last_update,timeline_cache_json){
    if(last_update === null || timeline_cache_json === null){
        return null;
    }
    if(parseInt(last_update)+(TIMELINE_LOCAL_EXPIRED*1000) < new Date().getTime()){
        return null;
    }
    let timeline_cache = JSON.parse(timeline_cache_json);
    for(let type in timeline_cache){
        timeline_cache[type].data = timeline_cache[type].data.slice(0,TIMELINE_LOCAL_LIMIT);
        let { minId, maxId } = getMinMaxId(null, null, timeline_cache[type].data);
        timeline_cache[type].minId = minId;
        timeline_cache[type].maxId = maxId;
    }
    return timeline_cache;
}