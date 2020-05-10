import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export default function TimelineCenterHeader({fixedTitle, onPress, current}){
    if(fixedTitle){
        return <Text style={styles.fixedTitle}>{fixedTitle}</Text>;
    }
    return(
        <TouchableOpacity
            onPress={onPress}>
            <View style={styles.container}>
                <Image
                    source={{uri: current.user_credentials && current.user_credentials.avatar}}
                    style={styles.image}
                />
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.text}>
                    {current.user_credentials && current.user_credentials.username}@{current.domain}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    image:{
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight:5
    },
    text:{
        width: 200,
        height: 30,
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