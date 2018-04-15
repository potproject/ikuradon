import React from "react";
import Mastolist from "../mastolist";
import { View, StyleSheet } from "react-native";
import MessageBarComponent from "../messagebar";

export default class Local extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <View style={styles.container}>
            <Mastolist type={"local"}/>
            <MessageBarComponent refName="local_alert" />
        </View>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});