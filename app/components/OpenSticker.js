import React, { memo } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function OpenSticker({ acct, currentDomain, data }){
    const sticker = getSticker(acct, currentDomain, data);
    if (sticker === null){
        return null;
    }
    return (
        <View style={styles.innerContainer}>
            <View style={[styles.padding, { backgroundColor: sticker.bgColor }]}></View>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[...sticker.bgColor, "#FFFFFF"]} style={styles.sticker}>
                <View style={styles.wrapper}>
                    <Image
                        source={{ uri: sticker.favicon }}
                        style={styles.photo}/>
                    <Text style={{ color:sticker.fontColor }} ellipsizeMode="tail" numberOfLines={1}>
                        {sticker.name}
                    </Text>
                </View>
            </LinearGradient>
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
        width: 68,
        flexDirection: "column",
    },
    sticker: {
        flex: 1,
        flexDirection: "column",
        fontSize: 15
    },
    wrapper:{
        flexDirection:"row",
        flexWrap:"wrap" 
    },
    photo: {
        width: 15,
        height: 15,
        marginRight:4
    },
});

export default memo(OpenSticker, (p, n) => p.acct === n.acct);