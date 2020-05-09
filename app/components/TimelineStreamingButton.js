import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { start, stop } from "../actions/actioncreators/streaming";

export default function TimelineStreamingButton({ type }){
    const dispatch = useDispatch();
    const [enabled, useEnabled] = useState(false);
    const streamSwitch = () => {
        !enabled ? dispatch(start(type)) : dispatch(stop(type));
        useEnabled(!enabled);
    };
    return (
        <View>
            <TouchableOpacity onPress={() => streamSwitch()} style={styles.view}>
                <FontAwesome name="feed" size={24} color={enabled === true ? "#00CCFF" : "#FFFFFF"} />
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