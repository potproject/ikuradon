import React from "react";
import Mastolist from "../mastolist";
import { View, StyleSheet } from "react-native";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <View style={styles.container}>
            <Mastolist type={"home"}/>
        </View>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});