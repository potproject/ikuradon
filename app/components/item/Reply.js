import React, { useContext, memo } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

import { ThemeContext } from "react-native-elements";

function Reply({ id, tootid, user, acct, image, body, style, onReply }){
    const { theme } = useContext(ThemeContext);
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={styles.container} onPress={() => onReply(id, tootid, user, acct, image, body)}>
                <FontAwesome name="reply" size={20} color={theme.customColors.item.none} />
            </TouchableOpacity>
            <View style={styles.container} />
        </View>
    );
}

Reply.propTypes = {
    id: PropTypes.string,
    tootid: PropTypes.string,
    user: PropTypes.string,
    acct: PropTypes.string,
    image: PropTypes.string,
    body: PropTypes.string,
    style: PropTypes.object,
    onReply: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    }
});

export default memo(Reply, (p, n) => p.id === n.id);