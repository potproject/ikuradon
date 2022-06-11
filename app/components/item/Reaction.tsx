import React, { useContext, useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Overlay, ThemeContext } from "react-native-elements";
import EmojisModal from "../EmojisModal";

function Reaction({ id, tootid, style, reactioned, onReaction }){
    const [stateOnPress, useStateOnPress] = useState(false);
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={[style, { flex: 1 }]} onPress={() => {
                useStateOnPress(true);
            }}>
                <FontAwesome name="plus" size={20} color={reactioned ? theme.customColors.item.bookmark : theme.customColors.item.none} />
            </TouchableOpacity>
            { stateOnPress && 
            <Overlay isVisible={stateOnPress} onBackdropPress={() => useStateOnPress(false)}>
                <EmojisModal onSelect={(emoji) => onReaction(id, tootid, reactioned, emoji)} />
            </Overlay>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    }
});

export default memo(Reaction, (p, n) => p.id === n.id && p.reactioned === n.reactioned);