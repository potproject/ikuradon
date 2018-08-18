import React from "react";
import { View, StyleSheet } from "react-native";
import SettingsList from "react-native-settings-list";
import * as LoginActions from "../../actions/actioncreators/login";
import * as ConfigActions from "../../actions/actioncreators/config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "../../i18n";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <View style={styles.container}>
                <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                    <SettingsList.Header headerStyle={styles.header} headerText={I18n.t("setting_header_personal")} />
                    <SettingsList.Item
                        titleStyle={styles.button}
                        onPress={() => this.props.ConfigActions.setBackground()}
                        title={I18n.t("setting_background")}
                    />
                    <SettingsList.Item
                        hasNavArrow={false}
                        titleStyle={styles.button}
                        onPress={() => this.props.ConfigActions.allClear()}
                        title={I18n.t("setting_allclear")}
                    />
                    <SettingsList.Header headerStyle={styles.header} headerText={I18n.t("setting_header_accounts")}/>
                    <SettingsList.Item
                        hasNavArrow={false}
                        titleStyle={styles.button}
                        title={I18n.t("account_change")}
                        onPress={() => this.props.LoginActions.accountChange()}
                    />
                    <SettingsList.Item
                        hasNavArrow={false}
                        titleStyle={styles.button}
                        title={I18n.t("logout")}
                        onPress={() => this.props.LoginActions.logout()}
                    />
                </SettingsList>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: { 
        marginTop: 25, 
        marginBottom: 5, 
        fontSize: 18,
    },
    button: {
        fontSize: 16,
        color: "#007aff"
    }
});

export default connect((state) => {
    return (state);
},
(dispatch) => ({
    LoginActions: bindActionCreators(LoginActions, dispatch),
    ConfigActions: bindActionCreators(ConfigActions, dispatch)
})
)(Setting);