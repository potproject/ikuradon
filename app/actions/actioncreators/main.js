import { AsyncStorage } from "react-native";
import * as Main from "../actiontypes/main";
import * as Nav from "../actiontypes/nav";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";

const reducerTypeArray = {
    home: CONST_API.GET_TIMELINES_HOME,
    local:CONST_API.GET_TIMELINES_LOCAL,
    federal:CONST_API.GET_TIMELINES_FEDERAL,
    notifications:CONST_API.GET_NOTIFICATIONS
};

export function toot() {
    return { type: Nav.NAV_TOOT };
}

export function reply(id, tootid, user, acct, image, body){
    return { type: Nav.NAV_TOOT_REPLY , data: {id, tootid, user, acct, image, body} };
}

export function newLoadingTimeline(reducerType,since_id, limit = 40) {
    return async dispatch => {
        dispatch({ type: Main.REFRESHING_MASTOLIST , reducerType });
        let data;
        try {
            let access_token = await AsyncStorage.getItem("access_token");
            let domain = await AsyncStorage.getItem("domain");
            data = await Networking.fetch(domain,  reducerTypeArray[reducerType], null,{ limit, since_id, max_id:null }, access_token);
        } catch (e) {
            console.error(e);
            return;
        }
        dispatch({ type: Main.NEW_UPDATE_MASTOLIST, data: data , reducerType });
    };
}

export function oldLoadingTimeline(reducerType, max_id, limit = 40) {
    return async dispatch => {
        dispatch({ type: Main.REFRESHING_MASTOLIST , reducerType });
        let data;
        try {
            let access_token = await AsyncStorage.getItem("access_token");
            let domain = await AsyncStorage.getItem("domain");
            data = await Networking.fetch(domain,  reducerTypeArray[reducerType], null,{ limit, since_id:null, max_id }, access_token);
        } catch (e) {
            console.error(e);
            return;
        }
        dispatch({ type: Main.OLD_UPDATE_MASTOLIST, data: data , reducerType });
    };
}