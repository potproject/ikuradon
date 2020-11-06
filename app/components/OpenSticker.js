import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function OpenSticker({ acct, currentDomain, data }){
    const sticker = getSticker(acct, currentDomain, data);
    if (sticker === null){
        return null;
    }
    return (
        <View style={styles.design}>
            <Text>{sticker.domain}</Text>
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
    design: {

    }
});