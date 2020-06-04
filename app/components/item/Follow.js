import React, { useContext, useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { ThemeContext } from "react-native-elements";
import t from "../../services/I18n";

function Follow({id, style, onFollow}){
    const [stateFollowed, useStateFollowed] = useState(false);
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={style} onPress={() => {
                useStateFollowed(!stateFollowed);
                //onFollow(id, !stateFollowed);
            }}>
                <Text style={styles.text}>
                    <FontAwesome name={stateFollowed ? "user" : "user-plus"} size={26} color={stateFollowed ? theme.colors.primary : theme.customColors.item.none} />
                    <Text style={[{color: stateFollowed ? theme.colors.primary : theme.customColors.item.none}, styles.inlineText]}>{stateFollowed ? t("notifications.unfollow") : t("notifications.follow")}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

Follow.propTypes = {
    id: PropTypes.string,
    userid: PropTypes.string,
    style: PropTypes.object,
    onFollow: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Follow;