import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default class Boost extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        tootid: PropTypes.string,
        style: PropTypes.number,
        reblogged: PropTypes.bool,
        count: PropTypes.number,

        onBoost: PropTypes.func,
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.reblogged !== nextProps.reblogged) {
            this.props.reblogged = nextProps.reblogged;
        }
        if (this.props.count !== nextProps.count) {
            this.props.count = nextProps.count;
        }
    }
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <TouchableOpacity style={this.props.style} onPress={() => this.props.onBoost(this.props.id, this.props.tootid, !this.props.reblogged)}>
                    <FontAwesome name="retweet" size={20} color={this.setColor(this.props.reblogged)} />
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.count !== 0 ? this.props.count : ""}</Text>
            </View>
        );
    }
    setColor(reblogged) {
        return reblogged === true ? "#2b90d9" : "gray";
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