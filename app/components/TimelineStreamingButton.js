import React, { useState, useContext, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { ThemeContext } from "react-native-elements";
import { start, stop, receive } from "../actions/actioncreators/streaming";
import { STREAMING } from "../constants/api";

const CurrentUserReducerSelector = state => state.currentUserReducer;

export default function TimelineStreamingButton({ type }){
    const dispatch = useDispatch();
    const { instance, access_token } = useSelector(CurrentUserReducerSelector);
    const { theme } = useContext(ThemeContext);
    const [enabled, useEnabled] = useState(false);
    const webSocket = useRef(null);
    const streamSwitch = () => {
        useEnabled(!enabled);
    };
    useEffect(() => {
        if (enabled && instance){
            // ON
            let stream;
            switch (type) {
                case "federal":
                    stream = "public";
                    break;
                case "local":
                    stream = "public:local";
                    break;
                case "home":
                default:
                    stream = "user";
                    break;
            }
            let url = instance.urls.streaming_api + STREAMING.url + "?access_token=" + access_token + "&stream=" + stream;
            webSocket.current = new WebSocket(url);
            webSocket.current.onopen = () => {
                // connection opened
                console.log("[WS] OPEN:" + type);
            };
            webSocket.current.onmessage = (message) => {
                let data = JSON.parse(message.data);
                if (data !== null){
                    let { event, payload } = data;
                    dispatch(receive(type, event, JSON.parse(payload)));
                }
            };
            webSocket.current.onclose = (event) => {
                console.log("[WS] CLOSE:" + type + " event:" + JSON.stringify(event));
            };
            webSocket.current.onerror = (event) => {
                console.log("[WS] ERROR:" + type + " event:" + JSON.stringify(event));
                dispatch(stop(type));
                useEnabled(false);
            };
            dispatch(start(type));
        } else {
            dispatch(stop(type));
            if (webSocket.current !== null && webSocket.current.readyState === WebSocket.OPEN){
                webSocket.current.close();
            }
        }
        return;
    }, [enabled]);
    useEffect(() => {
        return () => {
            // unmount
            dispatch(stop(type));
            if (webSocket.current !== null && webSocket.current.readyState === WebSocket.OPEN){
                webSocket.current.close();
                console.log("[WS] UNMOUNTCLOSE:" + type);
            }
        };
    }, []);
    return (
        <View>
            <TouchableOpacity onPress={() => streamSwitch()} style={styles.view}>
                <FontAwesome name="feed" size={24} color={enabled === true ? theme.customColors.primaryComplementary : theme.customColors.primaryBackground} />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 12,
        paddingRight: 4
    }
});