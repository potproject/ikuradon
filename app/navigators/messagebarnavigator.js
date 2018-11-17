import React from "react";
import { MessageBar, MessageBarManager } from "react-native-message-bar";

export default class MessageBarNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.refName = props.refName;
    }
    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs[this.refName]);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        return <MessageBar ref={this.refName} viewTopInset={20} />;
    }
}
