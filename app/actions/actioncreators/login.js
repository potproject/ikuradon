import { Alert } from "react-native";
import { AsyncStorage } from "react-native";
import * as Login from "../actiontypes/login";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import * as Nav from "../actiontypes/nav";
import * as Main from "../actiontypes/main";
import * as Streaming from "../actiontypes/streaming";

export function login(domain) {
    return async dispatch => {
        let url,client_id,client_secret;
        try {
            let data = await Networking.fetch(domain, CONST_API.REGISTERING_AN_APPLICATION);
            url = createUrl(domain, data);
            client_id = data.client_id;
            client_secret = data.client_secret;
        } catch (e) {
            Alert.alert("エラー", "問い合わせ失敗っす");
            dispatch({
                type: Login.DOMAIN_FAILURE,
            });
            return;
        } 
        dispatch({ type: Nav.NAV_AUTHORIZE, domain, url, client_id, client_secret });
        return;
    };
}

export function logout() {
    return async dispatch => {
        try {
            await AsyncStorage.removeItem("access_token");
            await AsyncStorage.removeItem("domain");
            await AsyncStorage.removeItem("timeline_cache");
        } catch (e) {
            console.log(e);
        } 
        await dispatch({ type: Streaming.STREAM_STOP });
        await dispatch({ type: Main.ALLCLEAR_MASTOLIST });
        dispatch({ type: Nav.NAV_LOGIN });
        return;
    };
}

function createUrl(domain, data) {
    return `https://${domain}/oauth/authorize?` +
        `client_id=${data.client_id}&` +
        `response_type=code&` +
        `redirect_uri=urn:ietf:wg:oauth:2.0:oob&` +
        `scope=read%20write%20follow`;
}

