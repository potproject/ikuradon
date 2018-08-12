import React from "react";
import { View, Button, StyleSheet } from "react-native";
//import { FontAwesome } from "@expo/vector-icons";
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
        return <View style={styles.container}>
            <Button
                onPress={() => this.props.LoginActions.accountChange()}
                title={I18n.t("account_change")}
            />
            <Button
                onPress={() => this.props.LoginActions.logout()}
                title={I18n.t("logout")}
            />
            <Button
                onPress={() => this.props.ConfigActions.setBackground()}
                title={I18n.t("setting_background")}
            />
        </View>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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