import { AsyncStorage } from "react-native";
import * as Authorize from "../actiontypes/authorize";
import * as CONST_API from "../../constants/api";
import Networking from "../../networking";
import * as Nav from "../actiontypes/nav";

export function getAccessTokenWithHomeAction(domain, client_id, client_secret, code) {
    return async dispatch => {
        let access_token;
        try {
            let data = await Networking.fetch(domain, CONST_API.GET_OAUTH_ACCESSTOKEN,null, {
                client_id,
                client_secret,
                code,
            });
            access_token = data.access_token;
            await AsyncStorage.setItem("access_token", access_token);
            await AsyncStorage.setItem("domain", domain);
        } catch (e) {
            dispatch({
                type: Authorize.AUTHORIZE_FAILURE,
            });
            return;
        }
        dispatch({
            type: Nav.NAV_MAIN,
            access_token,
            domain
        });
    };
}

