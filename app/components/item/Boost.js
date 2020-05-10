import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { ThemeContext } from "react-native-elements";

export default function Boost({ id, tootid, style, reblogged, count, disabled, onBoost}){
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={style} onPress={() => onBoost(id, tootid, !reblogged)} disabled={disabled}>
                <FontAwesome name={disabled ? "lock" : "retweet"} size={20} color={reblogged === true ? theme.customColors.item.boost : theme.customColors.item.none} />
            </TouchableOpacity>
            <Text style={styles.text}>{count !== 0 ? count : ""}</Text>
        </View>
    );
}

Boost.propTypes = {
    id: PropTypes.string,
    tootid: PropTypes.string,
    style: PropTypes.object,
    reblogged: PropTypes.bool,
    count: PropTypes.number,
    disabled: PropTypes.bool,
    onBoost: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: "gray"
    }
});