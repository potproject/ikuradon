import React from "react";
import { TouchableOpacity } from "react-native";
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
            reblogged: props.reblogged
        };
    }
    componentWillReceiveProps(nextProps) {
        this.props.reblogged = nextProps.reblogged;
    }
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={() => this.props.MastorowActions.boost(this.props.id, this.props.tootid, !this.props.reblogged)}>
                <FontAwesome name="retweet" size={20} color={this.setColor(this.props.reblogged)} />
            </TouchableOpacity>
        );
    }
    setColor(reblogged) {
        return reblogged === true ? "#2b90d9" : "gray";
    }
}


export default connect(state => state,
    (dispatch) => ({
        MastorowActions: bindActionCreators(MastorowActions, dispatch)
    })
)(Boost);