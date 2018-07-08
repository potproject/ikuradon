import React from "react";
import { TouchableOpacity, Linking, Clipboard } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ActionSheet from "react-native-actionsheet";
import I18n from "../../i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MainActions from "../../actions/actioncreators/main";
import { bodyFormat, bodyExtractionUrl } from "../../util/parser";
import PropTypes from "prop-types";

class Action extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        tootid: PropTypes.string,
        style: PropTypes.number,
        url: PropTypes.string,
        user: PropTypes.string,
        acct: PropTypes.string,
        image: PropTypes.string,
        body: PropTypes.string,
        my: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={this.onPress.bind(this)}>
                <FontAwesome name="ellipsis-h" size={20} color="gray" />
                {this.createAction()}
            </TouchableOpacity>
        );
    }
    onPress() {
        this.ActionSheet.show();
    }

    createAction(){
        let cancelButtonIndex = 5;
        let destructiveButtonIndex = 4;
        let options = [ I18n.t("action_openinbrowser"), I18n.t("action_copy"), I18n.t("action_copyurl"), I18n.t("action_reply"), I18n.t("action_hide")];
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
            case 1: //Copy
                Clipboard.setString(bodyFormat(this.props.body));
                return;
            case 2: //URL Copy
                Clipboard.setString(bodyExtractionUrl(this.props.body));
                return;
            case 3: //reply
                this.props.MainActions.reply(this.props.id, this.props.tootid, this.props.user, this.props.acct, this.props.image, this.props.body);
                return;
            case 4: //Hide
                this.props.MainActions.hide(this.props.id);
                return;
            case 5: //Delete
                if(this.props.my){
                    this.props.MainActions.deleting(this.props.id);
                }
                return;
        }
    }
}

export default connect(state => state,
    (dispatch) => ({
        MainActions: bindActionCreators(MainActions, dispatch)
    })
)(Action);