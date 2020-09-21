import React, { useState, useContext, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { ThemeContext } from "react-native-elements";
import { on as streamingOn, off as streamingOff } from "../util/stream";

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
            streamingOn(webSocket, dispatch, useEnabled, type, instance, access_token);
            console.log("[WS] ON:" + type);
        } else {
            // OFF
            streamingOff(webSocket, dispatch, useEnabled, type);
            console.log("[WS] OFF:" + type);
        }
        return;
    }, [enabled]);
    useEffect(() => {
        return () => {
            // UNMOUNT
            streamingOff(webSocket, dispatch, useEnabled, type);
            console.log("[WS] UNMOUNTCLOSE:" + type);
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