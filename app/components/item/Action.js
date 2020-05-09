import React from "react";
import { TouchableOpacity, Clipboard, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ActionSheet from "react-native-actionsheet";
import t from "../../services/I18n";
import {open as openUrl} from "../../util/url";
import { bodyFormat, bodyExtractionUrl } from "../../util/parser";
import PropTypes from "prop-types";

export default class Action extends React.Component {
    static propTypes = {
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
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <TouchableOpacity style={this.props.style} onPress={this.onPress.bind(this)}>
                    <FontAwesome name="ellipsis-h" size={20} color="#8899a6" />
                    {this.createAction()}
                </TouchableOpacity>
                <View style={styles.container} />
            </View>
        );
    }
    onPress() {
        this.ActionSheet.show();
    }

    createAction() {
        let cancelButtonIndex = 6;
        let destructiveButtonIndex = 5;
        let options = [t("action_openinbrowser"), t("action_openinbrowserprofile"), t("action_copy"), t("action_copyurl"), t("action_reply"), t("action_hide")];
        // 自分のtootなら削除可能に
        if (this.props.myself) {
            options.push(t("action_delete"));
            cancelButtonIndex++;
            destructiveButtonIndex++;
        }
        options.push(t("global_cancel"));
        return (
            <ActionSheet
                ref={component => (this.ActionSheet = component)}
                options={options}
                cancelButtonIndex={cancelButtonIndex}
                destructiveButtonIndex={destructiveButtonIndex}
                onPress={this.handlePress}
            />
        );
    }

    handlePress(i) {
        switch (i) {
            case 0: //Open in Browser
                openUrl(this.props.url);
                return;
            case 1: //Open in Browser Profile
                openUrl(this.props.account_url);
                return;
            case 2: //Copy
                Clipboard.setString(bodyFormat(this.props.body));
                return;
            case 3: //URL Copy
                Clipboard.setString(bodyExtractionUrl(this.props.body));
                return;
            case 4: //reply
                this.props.onReply(this.props.id, this.props.tootid, this.props.user, this.props.acct, this.props.image, this.props.body);
                return;
            case 5: //Hide
                this.props.onHide(this.props.id);
                return;
            case 6: //Delete
                if (this.props.myself) {
                    this.props.onDeleting(this.props.id);
                }
                return;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    }
});