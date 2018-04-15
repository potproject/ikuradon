import * as Nav from "../actiontypes/nav";
import * as CONST_API from "../../constants/api";
import { AsyncStorage } from "react-native";
import Networking from "../../networking";
import { ImagePicker } from "expo";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";

export function toot(status, visibility, sensitive, spoiler_text, reply = null) {
    return async dispatch => {
        try {
            let domain = await AsyncStorage.getItem("domain");
            let access_token = await AsyncStorage.getItem("access_token");
            let in_reply_to_id = null;
            if(reply !== null && typeof reply === "object" && typeof reply.tootid !== "undefined"){
                in_reply_to_id = reply.tootid;
            }
            await Networking.fetch(domain, CONST_API.POST_STATUS, null, {
                status,
                visibility,
                sensitive,
                spoiler_text,
                in_reply_to_id
            }, access_token);
            MessageBarManager.showAlert({
                title: I18n.t("messages.toot_success"),
                alertType: "success",
            });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.toot_failed"),
                alertType: "error",
            });
        }
        dispatch({ type: Nav.NAV_GO_BACK });
        return;
    };
}

export function mediaOpen(openType) {
    return async dispatch => {
        let fileData;
        try {
            if (openType === "library") {
                fileData = await ImagePicker.launchImageLibraryAsync();
            }
            if (openType === "camera") {
                fileData = await ImagePicker.launchCameraAsync();
            }
            if (!fileData || fileData.cancelled) {
                return;
            }
            let domain = await AsyncStorage.getItem("domain");
            let access_token = await AsyncStorage.getItem("access_token");
            //アップロード中とかほしいね
            await Networking.fileUpload(domain, access_token, fileData);
            dispatch();
        } catch (e) {
            console.error(e);
        }
        return;
    };
}