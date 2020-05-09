import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ItemTabBar({ type, name, badgeCount, color, size }) {
    return (
        <View style={{ width: 24, height: 24, margin: 5 }}>
            <FontAwesome name={name} size={size} color={color} />
            {badgeCount > 0 && (
                <View
                    style={{
                        // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                        position: "absolute",
                        right: -6,
                        top: -3,
                        backgroundColor: "red",
                        borderRadius: 6,
                        width: 12,
                        height: 12,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
                        {badgeCount > 9 ? "" : badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}