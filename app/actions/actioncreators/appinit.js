import * as Nav from '../actiontypes/nav';
import { AsyncStorage } from 'react-native';
import I18n from '../../i18n';

export function appInit() {
    return async dispatch => {
        const access_token = await AsyncStorage.getItem('access_token');
        const domain = await AsyncStorage.getItem('domain');
        await I18n.init();
        //ここにトークンが生きてるか判断させる
        if (access_token && domain) {
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

