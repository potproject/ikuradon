import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Icon, ThemeContext } from "react-native-elements";

export default function TootButton({ onPress }){
    const { theme } = useContext(ThemeContext);
    return (
        <View style={styles.shadow}>
            <Icon
                reverse
                raised
                size={28}
                name='pencil'
                type='font-awesome'
                color={theme.customColors.tootButton}
                onPress={onPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
    }
});