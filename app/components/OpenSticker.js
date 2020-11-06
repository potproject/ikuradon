import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-elements";

export default function OpenSticker({ acct, currentDomain, data }){
    const sticker = getSticker(acct, currentDomain, data);
    if (sticker === null){
        return null;
    }
    return (
        <View style={[styles.innerContainer, {
            backgroundColor: sticker.bgColor,
        }]}>
            <View style={styles.padding} ></View>
            <Text style={[styles.sticker, { color:sticker.fontColor }]} ellipsizeMode="tail" numberOfLines={1}>
                <Image
                    source={{ uri: sticker.favicon }}
                    style={styles.photo}/>
                {sticker.name}
            </Text>
        </View>
    );
}

function getSticker(acct, currentDomain, data){
    let domain = acct.split("@")[1];
    if (typeof domain !== "string"){
        domain = currentDomain;
    }
    if (typeof data[domain] !== "object"){
        return null;
    }
    return data[domain];
}
const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        flexDirection: "row",
        borderWidth: 0,
        height: "auto",
        marginTop:1,
        marginBottom:2
    },
    padding:{
        flex: 0.18,
        flexDirection: "column",
    },
    sticker: {
        flex: 0.82,
        flexDirection: "column",
        fontSize: 15
    },
    photo: {
        width: 15,
        height: 15,
        marginRight:2
    },
});