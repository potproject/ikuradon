import React, {useContext} from "react";
import { Platform, View, StyleSheet } from "react-native";
import { ListItem, ThemeContext } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import t from "../services/I18n";

const list = [
    {
        key: "public",
        icon: "globe",
        name: t("toot_visibility_public"),
        subtitle: t("toot_visibility_public_detail")
    },
    {
        key: "unlisted",
        icon: "unlock",
        name: t("toot_visibility_unlisted"),
        subtitle: t("toot_visibility_unlisted_detail")
    },
    {
        key: "private",
        icon: "lock",
        name: t("toot_visibility_private"),
        subtitle: t("toot_visibility_private_detail")
    },
    {
        key: "direct",
        icon: "envelope",
        name: t("toot_visibility_direct"),
        subtitle: t("toot_visibility_direct_detail")
    }
];

  
export default function VisibilityModal({onSelect}){
    const { theme }= useContext(ThemeContext);
    return(
        <View style={Platform.OS === "android" ? styles.containerAndroid : styles.containerIos}>
            {
                list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={() => <FontAwesome style={styles.icon} name={l.icon} size={26} color={theme.colors.grey1} />}
                        title={l.name}
                        subtitle={l.subtitle}
                        bottomDivider={i < 3}
                        onPress={() => onSelect(l.key)}
                    />
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    containerIos:{
        width: 300,
        height: 260
    },
    containerAndroid:{
        width: 320,
        height: 290
    },
    icon: {
        width:30,
        height:30,
    }
});