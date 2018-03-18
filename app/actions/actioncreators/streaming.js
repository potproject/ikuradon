import { AsyncStorage } from "react-native";
import * as Streaming from "../actiontypes/streaming";
import * as Main from "../actiontypes/main";
import * as CONST_API from "../../constants/api";
import Stream from "../../stream";

export function start(reducerType) {
    return async dispatch => {
        try {
            let access_token = await AsyncStorage.getItem("access_token");
            let domain = await AsyncStorage.getItem("domain");
            Stream.init(domain, CONST_API.STREAMING, access_token, reducerType);
            await Stream.open(reducerType);
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
            alert("エラー","Streaming APIの接続に失敗しました");
            dispatch({ type: Streaming.STREAM_STOP, reducerType });
            //console.error(e);
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
        } catch (e) {
            console.error(e);
            return;
        }
        dispatch({ type: Streaming.STREAM_STOP, reducerType });
    };
}