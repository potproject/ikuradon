import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { ThemeContext } from "react-native-elements";

export default function TimelineLeftHeader({ isBack, onPress }){
    const { theme } = useContext(ThemeContext);
    return (
        <View>
            <TouchableOpacity onPress={() => onPress()} style={styles.view}>
                {isBack ?
                    <FontAwesome name="chevron-left" size={20} color={theme.customColors.primaryBackground} />
                    :
                    <FontAwesome name="bars" size={20} color={theme.customColors.primaryBackground} />
                }
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