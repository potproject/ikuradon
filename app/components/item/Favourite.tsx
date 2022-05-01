import React, { useContext, useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { ThemeContext } from "react-native-elements";

function Favourite({ id, tootid, style, favourited, count, onFavourite }){
    const [stateFavourited, useStateFavourited] = useState(favourited);
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={[style, { flex: 1 }]} onPress={() => {
                useStateFavourited(!stateFavourited);
                onFavourite(id, tootid, !stateFavourited);
            }}>
                <FontAwesome name="star" size={20} color={stateFavourited ? theme.customColors.item.favourite : theme.customColors.item.none} />
            </TouchableOpacity>
            <Text style={[{ color: theme.colors.grey0, fontSize: count > 99 ? 10 : 16 }, styles.text]}>{count !== 0 ? count : ""}</Text>
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
        flex: 1
    }
});

export default memo(Favourite, (p, n) => p.id === n.id && p.favourited === n.favourited);