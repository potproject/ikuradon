import React from "react";
import { MessageBar, MessageBarManager } from "react-native-message-bar";

export default class MessageBarComponent extends React.Component {
    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        return <MessageBar ref="alert" />;
    }
}