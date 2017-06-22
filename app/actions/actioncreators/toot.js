import * as Nav from '../actiontypes/nav';
import * as CONST_API from '../../constants/api';
import { Alert, AsyncStorage } from 'react-native';
import Networking from '../../networking';

export function toot(message) {
    return async dispatch => {
        let url, client_id, client_secret;
        try {
            let domain = await AsyncStorage.getItem("domain");
            let access_token = await AsyncStorage.getItem("access_token");
            let data = await Networking.fetch(domain, CONST_API.POST_STATUS, null,{
                status: message
            },access_token);
        } catch (e) {
            Alert.alert("エラー", "問い合わせ失敗っす");
            dispatch({
                type: Nav.NAV_GO_BACK,
            });
            return;
        }
        dispatch({ type: Nav.NAV_GO_BACK });
        return;
    };
}

