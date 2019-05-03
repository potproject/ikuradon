import React from "react";
import { Clipboard, TextInput, Button, Image, Text, View, Picker } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MessageBarManager } from "react-native-message-bar";
import KeyboardSpacer from "react-native-keyboard-spacer";
import * as LoginActions from "../actions/actioncreators/login";
import I18n from "../services/i18n";
import * as Session from "../util/session";
import styles from "../stylesheets/default/login";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: "mastodon.social",
            token: "",
            isVisibleAccountsModal: false,
            isVisibleTokenModal: false,
            accounts: [],
            accountsValue: [],
            selectedAccountIndex: 0
        };
        //非同期
        this.accountsGet();
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/image/icon250.png")} />
                <Text style={styles.text}>{I18n.t("login_message")}</Text>
                <Button style={styles.button} onPress={() => this.openAccountsModal()} title={I18n.t("login_selectaccounts")} />
                <TextInput style={styles.textinput} onChangeText={text => this.setState({ domain: text })} value={this.state.domain} />
                <View style={styles.space} />
                <Button style={styles.button} onPress={() => this.props.LoginActions.login(this.state.domain)} title={I18n.t("login_button")} />
                <View style={styles.space} />
                <Button style={styles.button} onPress={() => this.openTokenModal()} title={I18n.t("login_token_button")} />
                <KeyboardSpacer />
                <Modal animationType="slide" transparent={false} visible={this.state.isVisibleAccountsModal}>
                    <View>
                        <Picker selectedValue={this.state.selectedAccountIndex} onValueChange={selectedAccountIndex => this.setState({ selectedAccountIndex })}>
                            {this.pickerList()}
                        </Picker>
                        <Button style={styles.button} onPress={() => this.copyAccessToken()} title={I18n.t("copy_access_token")} />
                        <View style={styles.space} />
                        <Button
                            style={styles.button}
                            onPress={() => {
                                this.setState({ isVisibleAccountsModal: false });
                                this.props.LoginActions.loginSelectAccounts(this.state.selectedAccountIndex);
                            }}
                            title={I18n.t("global_ok")}
                        />
                        <View style={styles.space} />
                        <Button style={styles.button} onPress={() => this.setState({ isVisibleAccountsModal: false })} title={I18n.t("global_cancel")} />
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={false} visible={this.state.isVisibleTokenModal}>
                    <View>
                        <Text style={styles.text}>{I18n.t("login_accesstoken_message")}</Text>
                        <TextInput style={styles.textinputAccessToken} onChangeText={token => this.setState({ token })} value={this.state.token} />
                        <Button
                            style={styles.button}
                            onPress={() => {
                                this.setState({ isVisibleTokenModal: false });
                                this.props.LoginActions.loginWithAccessToken(this.state.domain, this.state.token);
                            }}
                            title={I18n.t("global_ok")}
                        />
                        <Button style={styles.button} onPress={() => this.setState({ isVisibleTokenModal: false })} title={I18n.t("global_cancel")} />
                    </View>
                </Modal>
            </View>
        );
    }

    copyAccessToken() {
        Clipboard.setString(this.state.accounts[this.state.selectedAccountIndex].access_token);
        this.setState({ isVisibleAccountsModal: false });
        MessageBarManager.showAlert({
            title: I18n.t("messages.login_copy_accesstoken"),
            alertType: "info"
        });
    }
    openAccountsModal() {
        if (this.state.accounts.length > 0) {
            this.setState({ isVisibleAccountsModal: true });
        } else {
            MessageBarManager.showAlert({
                title: I18n.t("messages.login_notexist_accounts"),
                alertType: "warning"
            });
        }
    }
    openTokenModal() {
        if (this.state.domain) {
            this.setState({ isVisibleTokenModal: true });
        }
    }
    accountsGet() {
        Session.getAll().then(list => {
            //
            let accounts = list.accounts;
            let accountsValue = list.accounts.map(account => {
                let domain = account.domain;
                let username = account.username;
                let access_token = account.access_token;
                return `${username}@${domain}[${access_token.slice(0, 6)}]`;
            });
            this.setState({ accounts, accountsValue });
        });
    }
    pickerList() {
        let accountsValue = this.state.accountsValue;
        return accountsValue.map((value, index) => {
            return <Picker.Item key={index} label={value} value={index} />;
        });
    }
}

export default connect(
    state => state,
    dispatch => ({
        LoginActions: bindActionCreators(LoginActions, dispatch)
    })
)(Login);
