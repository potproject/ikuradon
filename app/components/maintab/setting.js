import React from "react";
import { View, Text, Switch, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as StreamingActions from "../../actions/actioncreators/streaming";
import * as LoginActions from "../../actions/actioncreators/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "../../i18n";

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            setting: {
                streaming_api_checked: false,
            }
        };
    }
    render() {
        return <View>
            <Text>{I18n.t("setting_streamingapi")}</Text>
            <Switch
                onValueChange={(streamingChecked) => streamingChecked ? this.streamStart() : this.streamStop()}
                value={this.state.setting.streaming_api_checked}
            />
            <Button
                onPress={() => this.props.LoginActions.logout()}
                title={I18n.t("logout")}
            />
        </View>;
    }
    streamStart() {
        this.setState({ setting: { streaming_api_checked: true } });
        this.props.StreamingActions.start();
    }
    streamStop() {
        this.setState({ setting: { streaming_api_checked: false } });
        this.props.StreamingActions.stop();
    }
}

export default connect((state) => {
    return (state)
},
(dispatch) => ({
    StreamingActions: bindActionCreators(StreamingActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch)
})
)(Setting);