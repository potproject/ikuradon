import React, { useContext, useState, memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { useActionSheet } from "@expo/react-native-action-sheet";
import t from "../../services/I18n";

import { ThemeContext } from "react-native-elements";

function Boost(props){
    const { id, tootid, style, reblogged, count, disabled, onBoost, onQuote, user, acct, image, body } = props;
    const [stateReblogged, useStateReblogged] = useState(reblogged);
    const { theme } = useContext(ThemeContext);
    const { showActionSheetWithOptions } = useActionSheet();
    const onOpenActionSheet = () => {
        showActionSheetWithOptions(
            {
                options: [t("boost_repost"), t("boost_quote"), t("global_cancel")],
                cancelButtonIndex: 2,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        useStateReblogged(!stateReblogged);
                        onBoost(id, tootid, !stateReblogged);
                        return;
                    case 1:
                        onQuote(id, tootid, user, acct, image, body);
                        return;
                    case 2:
                        return;
                }
            },
        );
    };
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={style} disabled={disabled} onPress={() => {
                if (onQuote && !stateReblogged) {
                    onOpenActionSheet();
                    return;
                }
                useStateReblogged(!stateReblogged);
                onBoost(id, tootid, !stateReblogged);
            }}>
                <FontAwesome name={disabled ? "lock" : "retweet"} size={20} color={stateReblogged === true ? theme.customColors.item.boost : theme.customColors.item.none} />
            </TouchableOpacity>
            <Text style={[{ color: theme.colors.grey0, fontSize: count > 99 ? 10 : 16 }, styles.text]}>{count !== 0 ? count : ""}</Text>
        </View>
    );
}

Boost.propTypes = {
    id: PropTypes.string,
    tootid: PropTypes.string,
    style: PropTypes.object,
    reblogged: PropTypes.bool,
    count: PropTypes.number,
    disabled: PropTypes.bool,
    onBoost: PropTypes.func,
    onQuote: PropTypes.func,
    user: PropTypes.string,
    acct: PropTypes.string,
    image: PropTypes.string,
    body: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    text: {
        flex: 1
    }
});

export default memo(Boost, (p, n) => p.id === n.id && p.reblogged === n.reblogged);