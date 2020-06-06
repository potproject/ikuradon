import React, { memo, useContext } from "react";
import { TouchableOpacity, Clipboard, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import t from "../../services/I18n";
import {open as openUrl} from "../../util/url";
import { bodyFormat, bodyExtractionUrl } from "../../util/parser";
import PropTypes from "prop-types";
import { ThemeContext } from "react-native-elements";

function Action({id, tootid, style, url, account_url, user, acct,image, body, myself, onReply, onHide, onDeleting}){
    const { theme } = useContext(ThemeContext);
    const { showActionSheetWithOptions } = useActionSheet();
    const onOpenActionSheet = () => {
        let cancelButtonIndex = 6;
        let destructiveButtonIndex = 5;
        let options = [t("action_openinbrowser"), t("action_openinbrowserprofile"), t("action_copy"), t("action_copyurl"), t("action_reply"), t("action_hide")];
        // 自分のtootなら削除可能に
        if (myself) {
            options.push(t("action_delete"));
            cancelButtonIndex++;
            destructiveButtonIndex++;
        }
        options.push(t("global_cancel"));
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0: //Open in Browser
                        openUrl(url);
                        return;
                    case 1: //Open in Browser Profile
                        openUrl(account_url);
                        return;
                    case 2: //Copy
                        Clipboard.setString(bodyFormat(body));
                        return;
                    case 3: //URL Copy
                        Clipboard.setString(bodyExtractionUrl(body));
                        return;
                    case 4: //reply
                        onReply(id, tootid, user, acct, image, body);
                        return;
                    case 5: //Hide
                        onHide(id);
                        return;
                    case 6: //Delete
                        if (myself) {
                            onDeleting(id);
                        }
                        return;
                }
            },
        );
    };
    return (
        <View style={[style, styles.container]}>
            <TouchableOpacity style={style} onPress={() => onOpenActionSheet()}>
                <FontAwesome name="ellipsis-h" size={20} color={theme.customColors.item.none} />
            </TouchableOpacity>
            <View style={styles.container} />
        </View>
    );
}

Action.propTypes = {
    id: PropTypes.string,
    tootid: PropTypes.string,
    style: PropTypes.object,
    url: PropTypes.string,
    account_url: PropTypes.string,
    user: PropTypes.string,
    acct: PropTypes.string,
    image: PropTypes.string,
    body: PropTypes.string,
    myself: PropTypes.bool,

    onReply: PropTypes.func,
    onHide: PropTypes.func,
    onDeleting: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    }
});

export default memo(Action, (p, n) => p.id === n.id);