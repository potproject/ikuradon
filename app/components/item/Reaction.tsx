import React, { useContext, useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Overlay, ThemeContext } from "react-native-elements";
import EmojisModal from "../EmojisModal";

function Reaction({ id, tootid, style, reactioned, onReaction }){
    const [stateReactioned, useStateReactioned] = useState(reactioned);
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={[style, { flex: 1 }]} onPress={() => {
                useStateReactioned(!stateReactioned);
            }}>
                <FontAwesome name="plus" size={20} color={stateReactioned ? theme.customColors.item.bookmark : theme.customColors.item.none} />
            </TouchableOpacity>
            { stateReactioned && 
            <Overlay isVisible={stateReactioned} onBackdropPress={() => useStateReactioned(false)}>
                <EmojisModal onSelect={onReaction} />
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