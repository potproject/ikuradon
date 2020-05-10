import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { ThemeContext } from "react-native-elements";

export default function Favourite({id, tootid, style, favourited, count, onFavourite}){
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={[style, { flex: 1 }]} onPress={() => onFavourite(id, tootid, !favourited)}>
                <FontAwesome name="star" size={20} color={favourited ? theme.customColors.item.favourite : theme.customColors.item.none} />
            </TouchableOpacity>
            <Text style={styles.text}>{count !== 0 ? count : ""}</Text>
        </View>
    );
}

Favourite.propTypes = {
    id: PropTypes.string,
    tootid: PropTypes.string,
    style: PropTypes.object,
    favourited: PropTypes.bool,
    count: PropTypes.number,
    onFavourite: PropTypes.func
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