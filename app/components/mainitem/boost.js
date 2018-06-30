import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MastorowActions from "../../actions/actioncreators/mastorow";

class Boost extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            id: props.id,
            tootid: props.tootid,
            style: props.style,
            reblogged: props.reblogged,
            count: props.count
        };
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
                <TouchableOpacity style={this.props.style} onPress={() => this.props.MastorowActions.boost(this.props.id, this.props.tootid, !this.props.reblogged)}>
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
        fontSize: "16",
        color: "gray"
    }
});

export default connect(state => state,
    (dispatch) => ({
        MastorowActions: bindActionCreators(MastorowActions, dispatch)
    })
)(Boost);