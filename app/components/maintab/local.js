import React from "react";
import {Button} from "react-native";
import Mastolist from "../mastolist";
import { FontAwesome } from "@expo/vector-icons";
import I18n from "../../i18n";

export default class Local extends React.Component {
    static navigationOptions = {
        title: "Local",
        headerRight: <Button title="Toot" onPress={() => headerRightHandler()} />,
        tabBarIcon: ({ focused, tintColor }) => (
            <FontAwesome name="users" size={26} color={tintColor} />
        )
    };
    constructor(props) {
        super(props);
        Local.navigationOptions.title = I18n.t("navigation_local");
    }
    render() {
        return <Mastolist type={"local"}/>
    }
}