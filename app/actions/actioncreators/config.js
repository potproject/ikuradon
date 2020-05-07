import * as Config from "../actiontypes/config";
import * as Permission from "../../util/permission";
import { ImagePicker } from "expo";
import { MessageBarManager } from "react-native-message-bar";
import I18n from "../../services/i18n";

import * as RouterName from "../../constants/RouterName";
import NavigationService from "../../services/NavigationService";
import * as Nav from "../actiontypes/nav";

export function allClear() {
    return async dispatch => {
        dispatch({ type: Config.CONFIG_RESET });
        NavigationService.resetAndNavigate({ name: RouterName.Main });
        dispatch({ type: Nav.NAV_MAIN });
    };
}

export function setBackground() {
    return async dispatch => {
        try {
            await Permission.getBeforeAsk(Permission.CAMERA_ROLL);
            let fileData = await ImagePicker.launchImageLibraryAsync();
            if (!fileData || !fileData.uri || fileData.cancelled) {
                return;
            }
            dispatch({ type: Config.SET_BACKGROUNDIMAGE, backgroundImage: fileData.uri });
            NavigationService.resetAndNavigate({ name: RouterName.Main });
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

export function setInvisibleTimeline(type, value) {
    return async dispatch => {
        let invisible = {};
        invisible[type] = value;
        dispatch({ type: Config.INVISIBLE_SETTING, invisible });
        NavigationService.resetAndNavigate({ name: RouterName.Main });
        dispatch({ type: Nav.NAV_MAIN });
    };
}

export function setSmartMode(value) {
    return async dispatch => {
        dispatch({ type: Config.SMART_MODE, smartMode: value });
        NavigationService.resetAndNavigate({ name: RouterName.Main });
        dispatch({ type: Nav.NAV_MAIN });
    };
}

export function setTimelinePerform(value) {
    return async dispatch => {
        dispatch({ type: Config.TIMELINE_PERFORM, timelinePerform: value });
        NavigationService.resetAndNavigate({ name: RouterName.Main });
        dispatch({ type: Nav.NAV_MAIN });
    };
}
