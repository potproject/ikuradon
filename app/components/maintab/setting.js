import React from "react";
import { View, Text, Switch, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as LoginActions from "../../actions/actioncreators/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "../../i18n";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return <View>
            <Button
                onPress={() => this.props.LoginActions.logout()}
                title={I18n.t("logout")}
            />
        </View>;
    }
}

export default connect((state) => {
    return (state);
},
(dispatch) => ({
    LoginActions: bindActionCreators(LoginActions, dispatch)
})
)(Setting);