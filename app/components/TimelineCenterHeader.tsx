import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import CustomEmoji from "react-native-customemoji";
import { emojisArrayToObject } from "../util/parser";

export default function TimelineCenterHeader({ fixedTitle, onPress, current }){
    if (fixedTitle){
        return <Text style={styles.fixedTitle}>{fixedTitle}</Text>;
    }
    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={styles.container}>
                { current.user_credentials &&
                <Image
                    source={{ uri: current.user_credentials.avatar }}
                    style={styles.image}
                />
                }
                <View>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                        {current.user_credentials && current.user_credentials.username}@{current.domain}
                    </Text>
                    <CustomEmoji emojiStyle={{ width: 14, height: 14, resizeMode: "contain" }}  emojis={current.user_credentials && current.user_credentials.emojis ? emojisArrayToObject(current.user_credentials.emojis) : []}>
                        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                            {current.user_credentials.display_name}
                        </Text>
                    </CustomEmoji>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 4,
        paddingBottom: 4,
    },
    image:{
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight:5
    },
    textView:{
        flex: 1,
    },
    text:{
        width: 200,
        height: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        alignSelf: "center"
    },
    fixedTitle:{
        fontWeight: "bold",
        color: "#FFFFFF",
        alignSelf: "center",
        fontSize: 18,
    }
});