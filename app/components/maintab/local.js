import React from "react";
import Mastolist from "../mastolist";
import { View, StyleSheet } from "react-native";
import { MessageBar, MessageBarManager } from "react-native-message-bar";

export default class Local extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }
    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }
    render() {
        return <View style={styles.container}>
            <Mastolist type={"local"}/>
            <MessageBar ref="alert" />
        </View>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});