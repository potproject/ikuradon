import React from "react";
import { Button } from "react-native";
import Mastolist from "../mastolist";
import { FontAwesome } from "@expo/vector-icons";
import I18n from "../../i18n";

export default class Federal extends React.Component {
    static navigationOptions = {
        title: "Federal",
        headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
        tabBarIcon: ({ focused, tintColor }) => (
            <FontAwesome name="globe" size={32} color={tintColor} />
        )
    };
    constructor(props) {
        super(props);
        Federal.navigationOptions.title = I18n.t("navigation_federal");
        Federal.navigationOptions.headerRight = <Button title={I18n.t("navigation_button_toot")} onPress={() => headerRightHandler()} />;
    }
    render() {
        return <Mastolist type={"federal"} />
    }
}