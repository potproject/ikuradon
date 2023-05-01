import React, { useState, useContext, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { ThemeContext } from "react-native-elements";
import { on as streamingOn, off as streamingOff, getStreamingURL, streamSupported } from "../util/stream";
import { RootState } from "../reducers";

const CurrentUserReducerSelector = (state: RootState) => state.currentUserReducer;

export default function TimelineStreamingButton({ type }){
    const dispatch = useDispatch();
    const { instance, access_token, sns } = useSelector(CurrentUserReducerSelector);
    const { theme } = useContext(ThemeContext);
    const [enabled, useEnabled] = useState(false);
    const webSocketRef = useRef(null);
    const streamingAPI = instance && instance.urls && typeof instance.urls.streaming_api === "string" ? instance.urls.streaming_api : "";
    const streamingURL = getStreamingURL(sns, streamingAPI, type, access_token);
    useEffect(() => {
        if (enabled && instance && streamingAPI){
            // ON
            streamingOn(sns, webSocketRef, dispatch, useEnabled, type, streamingURL);
            console.log("[WS] ON:" + type);
        } else {
            // OFF
            streamingOff(sns, webSocketRef, dispatch, useEnabled, type);
            console.log("[WS] OFF:" + type);
        }
        return;
    }, [enabled]);
    useEffect(() => {
        return () => {
            // UNMOUNT
            streamingOff("mastodon", webSocketRef, dispatch, useEnabled, type);
            console.log("[WS] UNMOUNTCLOSE:" + type);
        };
    }, []);
    if (!streamSupported(sns)){
        return <View></View>;
    }
    return (
        <TouchableOpacity style={styles.view} onPress={() => useEnabled(!enabled)}>
            <FontAwesome name="feed" size={24} color={enabled === true ? theme.customColors.primaryComplementary : theme.customColors.primaryBackground} />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    view: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 12,
        paddingRight: 8
    }
});