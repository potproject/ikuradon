import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { ThemeContext } from "react-native-elements";
import t from "../../services/I18n";
import { getRelationship } from "../../util/relationships";

function Follow({ id, style, onFollow }){
    const [stateFollowed, useStateFollowed] = useState(false);
    const [stateFollowered, useStateFollowered] = useState(false);
    const { theme } = useContext(ThemeContext);
    useEffect(() => {
        getRelationship(id).then(({ data, error }) => {
            if (error === null && data.following){
                useStateFollowed(true);
            }
            if (error===null && data.followed_by){
                useStateFollowered(true);
            }
        });
    }, []);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={style} onPress={() => {
                useStateFollowed(!stateFollowed);
                onFollow(id, !stateFollowed);
            }}>
                <Text style={styles.followText}>
                    <FontAwesome name={stateFollowed ? "user" : "user-plus"} size={18} color={stateFollowed ? theme.colors.primary : theme.customColors.item.none} />
                    <Text style={[{ color: stateFollowed ? theme.colors.primary : theme.customColors.item.none }, styles.inlineText]}>
                        {" "}{stateFollowed ? t("notifications.unfollow") : t("notifications.follow")}
                    </Text>
                </Text>
            </TouchableOpacity>
            {stateFollowered &&
                    <View style={[styles.followeredView, { borderColor: theme.colors.primary }, ]}>
                        <Text style={[styles.followeredText, { color: theme.colors.primary }]}>{t("notifications.followered")}</Text>
                    </View>
            }
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
        flex: 1,
        flexDirection: "row",
    },
    followText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    followeredView: {
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 2,
        paddingRight: 2,
    },
    followeredText: {
        fontSize: 17,
        marginRight: 6,
    },
});

export default Follow;