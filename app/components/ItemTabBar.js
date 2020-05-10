import React, { useContext } from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { ThemeContext } from "react-native-elements";

function ItemTabBar({ name, badgeCount, streamBadge, color, size }) {
    const { theme } = useContext(ThemeContext);
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <FontAwesome name={name} size={size} color={color} />
            {(streamBadge || badgeCount > 0) && (
                <View
                    style={{
                        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                        position: "absolute",
                        right: -6,
                        top: -3,
                        backgroundColor: !streamBadge ? theme.colors.primary : theme.customColors.primaryComplementary,
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                        {streamBadge || badgeCount > 9 ? "" : badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default ItemTabBar;