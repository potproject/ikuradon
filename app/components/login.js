import React from "react";
import {
    StyleSheet,
    TextInput,
    Button,
    Image,
    Text,
    View,
    TouchableHighlight,
    Modal,
    Picker,
} from "react-native";
import Dimensions from "Dimensions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MessageBarManager } from "react-native-message-bar";
import KeyboardSpacer from "react-native-keyboard-spacer";
import * as LoginActions from "../actions/actioncreators/login";
import I18n from "../i18n";
import * as Session from "../util/session";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: "mastodon.social",
            isVisibleAccountsModal: false,
            accounts: [],
            accountsValue: [],
            selectedAccountIndex : 0,
        };
        //非同期
        this.accountsGet();

    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require("../../assets/image/icon250.png")}
                />
                <Text style={styles.text}>
                    {I18n.t("login_message")}
                </Text>
                <Button
                    style={styles.button}
                    onPress={() => this.openAccountsModal()}
                    title={I18n.t("login_selectaccounts")}>
                </Button>
                <TextInput
                    style={styles.textinput}
                    /** [BUG!]iOS ReactNative's state update via this.setState breaks text input mode for Korean, Chinese, Japanese characters in 0.54 and 0.55 */
                    /** Reference: https://github.com/facebook/react-native/issues/19339 */
                    onChangeText={(text) => this.setState({ domain: text })}
                    value={this.state.domain} />
                <View style={styles.space} />
                <Button
                    style={styles.button}
                    onPress={() => this.props.LoginActions.login(this.state.domain)}
                    title={I18n.t("login_button")}
                />
                <KeyboardSpacer />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isVisibleAccountsModal}
                >
                    <View>
                        <Picker
                            onValueChange={(selectedAccountIndex) => this.setState({ selectedAccountIndex })}>
                            {this.pickerList()}
                        </Picker>
                        <TouchableHighlight onPress={() => {
                            this.setState({ isVisibleAccountsModal: false });
                            this.props.LoginActions.loginSelectAccounts(this.state.selectedAccountIndex);
                        }}>
                            <Text>{I18n.t("global_ok")}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.setState({ isVisibleAccountsModal: false })}>
                            <Text>{I18n.t("global_cancel")}</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        );
    }

    openAccountsModal(){
        if(this.state.accounts.length > 0){
            this.setState({isVisibleAccountsModal: true});
        }else{
            MessageBarManager.showAlert({
                title: I18n.t("messages.login_notexist_accounts"),
                alertType: "warning",
            });
        }
    }
    accountsGet(){
        Session.getAll().then((list)=>{
            //
            let accounts = list.accounts;
            let accountsValue = list.accounts.map((account)=>{
                let domain = account.domain;
                let username = account.username;
                let access_token = account.access_token;
                return `${username}@${domain}[${access_token.slice(0,6)}]`;
            });
            this.setState({accounts , accountsValue});
        });
    }
    pickerList(){
        let accountsValue = this.state.accountsValue;
        return accountsValue.map((value,index)=>{
            return <Picker.Item key={index} label={value} value={index} />;
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textinput: {
        height: 40,
        width: Dimensions.get("window").width - 20,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        padding: 2
    },
    text:{
        fontSize: 14,
        textAlign: "center",
        margin: 10,
    },
    space: {
        height: 30
    },
    image: {
        width: 75,
        height: 75,
        marginTop: 0,
        marginBottom: 25
    }
});

export default connect(state => state,
    (dispatch) => ({
        LoginActions: bindActionCreators(LoginActions, dispatch)
    })
)(Login);