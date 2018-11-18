import React from "react";
import Mastolist from "../mastolist";
import { View, StyleSheet } from "react-native";

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Mastolist type={"notifications"} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
