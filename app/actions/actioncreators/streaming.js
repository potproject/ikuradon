import * as Streaming from "../actiontypes/streaming";
import * as Main from "../actiontypes/main";
import * as CONST_API from "../../constants/api";
import Stream from "../../stream";
import I18n from "../../i18n";
import { MessageBarManager } from "react-native-message-bar";
import * as Session from "../../util/session";

export function start(reducerType) {
    return async dispatch => {
        try {
            let { domain, access_token } = await Session.getDomainAndToken();
            Stream.init(domain, CONST_API.STREAMING, access_token, reducerType);
            await Stream.open(reducerType);
            MessageBarManager.showAlert({
                title: I18n.t("messages.streaming_enabled"),
                alertType: "info",
            });
            dispatch({ type: Streaming.STREAM_START, reducerType });
            Stream.receive((message) => {
                if (message.event === "update" && message.payload) {
                    dispatch({ type: Main.NEW_UPDATE_MASTOLIST, data: [JSON.parse(message.payload)], reducerType });
                }else if (message.event === "notification" && message.payload) {
                    dispatch({ type: Main.NEW_UPDATE_MASTOLIST, data: [JSON.parse(message.payload)], reducerType: "notifications" });
                }else if (message.event === "delete" && message.payload) {
                //いつか実装します
                }
            },reducerType);
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.streaming_failed"),
                alertType: "error",
            });
            dispatch({ type: Streaming.STREAM_STOP, reducerType });
            return;
        }
    };
}

export function stop(reducerType) {
    return async dispatch => {
        try {
            let closeCode = await Stream.close(reducerType);
            if (closeCode < 1000 && closeCode > 1015) {
                //不明な切断
                return;
            }
            MessageBarManager.showAlert({
                title: I18n.t("messages.streaming_disabled"),
                alertType: "info",
            });
        } catch (e) {
            MessageBarManager.showAlert({
                title: I18n.t("messages.streaming_failed"),
                alertType: "error",
            });
            return;
        }
        dispatch({ type: Streaming.STREAM_STOP, reducerType });
    };
}