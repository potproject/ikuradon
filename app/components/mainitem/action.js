import React from "react";
import { TouchableOpacity, Linking, Clipboard, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ActionSheet from "react-native-actionsheet";
import I18n from "../../i18n";
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
        my: PropTypes.bool,

        onReply: PropTypes.func,
        onHide: PropTypes.func,
        onDeleting: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <TouchableOpacity style={this.props.style} onPress={this.onPress.bind(this)}>
                    <FontAwesome name="ellipsis-h" size={20} color="gray" />
                    {this.createAction()}
                </TouchableOpacity>
                <View style={styles.container}></View>
            </View>
        );
    }
    onPress() {
        this.ActionSheet.show();
    }

    createAction(){
        let cancelButtonIndex = 6;
        let destructiveButtonIndex = 5;
        let options = [ I18n.t("action_openinbrowser"),I18n.t("action_openinbrowserprofile"), I18n.t("action_copy"), I18n.t("action_copyurl"), I18n.t("action_reply"), I18n.t("action_hide")];
        //自分のtootなら削除可能に
        if(this.props.my){
            options.push(I18n.t("action_delete"));
            cancelButtonIndex++;
            destructiveButtonIndex++;
        }
        options.push(I18n.t("global_cancel"));
        return <ActionSheet
            ref={component => this.ActionSheet = component}
            options={options}
            cancelButtonIndex={cancelButtonIndex}
            destructiveButtonIndex={destructiveButtonIndex}
            onPress={this.handlePress}
        />;
    }

    async openUrl(url){
        try {
            let supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.log("not supported url");
            }
        } catch (e) {
            console.error("Linking error", e);
        }
    }
    handlePress(i) {
        switch(i){
            case 0: //Open in Browser
                this.openUrl(this.props.url);
                return;
            case 1: //Open in Browser Profile
                this.openUrl(this.props.account_url);
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
                if(this.props.my){
                    this.props.onDeleting(this.props.id);
                }
                return;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    }
});