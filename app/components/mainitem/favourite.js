import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as MastorowActions from "../../actions/actioncreators/mastorow";
import PropTypes from "prop-types";

class Favourite extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        tootid: PropTypes.string,
        style: PropTypes.number,
        favourited: PropTypes.bool,
        count: PropTypes.number
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.favourited !== nextProps.favourited) {
            this.props.favourited = nextProps.favourited;
        }
        if (this.props.count !== nextProps.count) {
            this.props.count = nextProps.count;
        }
    }
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <TouchableOpacity style={[this.props.style, { flex: 1 }]} onPress={() => this.props.MastorowActions.favourite(this.props.id, this.props.tootid, !this.props.favourited)}>
                    <FontAwesome name="star" size={20} color={this.setColor(this.props.favourited)} />
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.count !== 0 ? this.props.count : ""}</Text>
            </View>
        );
    }
    setColor(favourited) {
        return favourited ? "#ca8f04" : "gray";
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

export default connect(state => state,
    (dispatch) => ({
        MastorowActions: bindActionCreators(MastorowActions, dispatch)
    })
)(Favourite);