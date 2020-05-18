import React, { useContext, useState, memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { ThemeContext } from "react-native-elements";

function Bookmark({id, tootid, style, bookmarked, onBookmark}){
    const [stateBookmarked, useStateBookmarked] = useState(bookmarked);
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={[style, { flex: 1 }]} onPress={() => {
                useStateBookmarked(!stateBookmarked);
                onBookmark(id, tootid, !stateBookmarked);
            }}>
                <FontAwesome name="bookmark" size={20} color={stateBookmarked ? theme.customColors.item.bookmark : theme.customColors.item.none} />
            </TouchableOpacity>
        </View>
    );
}

Bookmark.propTypes = {
    id: PropTypes.string,
    tootid: PropTypes.string,
    style: PropTypes.object,
    bookmarked: PropTypes.bool,
    count: PropTypes.number,
    onFavourite: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    }
});

export default memo(Bookmark, (p, n) => p.id === n.id && p.favourited === n.favourited);