import React, { useContext,  } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { ThemeContext } from "react-native-elements";

export default function TimelineTootButton({ enabled, onPress, loading }){
    const { theme } = useContext(ThemeContext);
    return (
        <View>
            {enabled &&
            <TouchableOpacity disabled={loading} onPress={onPress} style={styles.view}>
                { loading ?
                    <FontAwesome name="spinner" size={24} color={theme.customColors.primaryBackground} />
                    :
                    <FontAwesome name="pencil" size={24} color={theme.customColors.primaryBackground} />
                }
            </TouchableOpacity>
            }
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