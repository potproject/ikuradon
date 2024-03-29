import React, { useContext } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { Image, ListItem, ThemeContext } from "react-native-elements";
import t from "../services/I18n";

const list = [
    {
        key: "mastodon",
        image: require("../../assets/logo/mastodon.png"),
        name: t("sns.mastodon")
    },
    {
        key: "misskey",
        image: require("../../assets/logo/misskey.png"),
        name: t("sns.misskey")
    },
    {
        key: "pleroma",
        image: require("../../assets/logo/mastodon.png"),
        name: t("sns.pleroma")
    },
    {
        key: "bluesky",
        image: require("../../assets/logo/bluesky.png"),
        name: t("sns.bluesky")
    }
];

export default function SnsModal({ onSelect }){
    const { theme }= useContext(ThemeContext);
    return (
        <View style={Platform.OS === "android" ? styles.containerAndroid : styles.containerIos}>
            {
                list.map((l, i) => (
                    <ListItem
                        key={i}
                        bottomDivider={i < list.length-1}
                        onPress={() => onSelect(l.key)}
                    >
                        <Image style={styles.logo} source={l.image} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containerIos:{
        width: 220,
        height: 240
    },
    containerAndroid:{
        width: 240,
        height: 270
    },
    logo: {
        width:30,
        height:30,
    }
});