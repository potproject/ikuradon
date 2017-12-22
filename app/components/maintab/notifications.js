import React from "react";
import {Button} from "react-native";
import Mastolist from "../mastolist";
import { FontAwesome } from "@expo/vector-icons";
import I18n from "../../i18n";

export default class Notifications extends React.Component {
    static navigationOptions = {
        title: "Notifications",
        headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
        tabBarIcon: ({ focused, tintColor }) => (
            <FontAwesome name="bell" size={26} color={tintColor} />
        )
    };
    constructor(props) {
        super(props);
        Notifications.navigationOptions.title = I18n.t("navigation_notifications");
        Notifications.navigationOptions.headerRight = <Button title={I18n.t("navigation_button_toot")} onPress={() => headerRightHandler()} />;
    }
    render() {
        return <Mastolist type={"notifications"}/>
    }
}