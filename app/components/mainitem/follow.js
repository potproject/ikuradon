import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default class Follow extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        user: PropTypes.string,
        acct: PropTypes.string,
        style: PropTypes.number,

        onFollow: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            followed : false
        };
        this.checkFollow();
    }
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <TouchableOpacity style={this.props.style} onPress={() => this.props.onFollow(this.props.id,!this.state.followed)}>
                    <FontAwesome name={"user-plus"} size={20} color={this.state.followed === true ? "#2b90d9" : "gray"} />
                </TouchableOpacity>
            </View>
        );
    }
    async checkFollow(){
        // TODO
        return false;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: "gray"
    }
});