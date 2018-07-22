import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default class Reply extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        tootid: PropTypes.string,
        user: PropTypes.string,
        acct: PropTypes.string,
        image: PropTypes.string,
        body: PropTypes.string,
        style: PropTypes.number,

        onReply: PropTypes.func,
    }
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={()=>this.props.onReply(this.props.id, this.props.tootid, this.props.user, this.props.acct, this.props.image, this.props.body)}>
                <FontAwesome name="reply" size={20} color="gray" />
            </TouchableOpacity>
        );
    }
}