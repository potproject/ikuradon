import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as MainActions from "../../actions/actioncreators/main";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

class Reply extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        tootid: PropTypes.string,
        user: PropTypes.string,
        acct: PropTypes.string,
        image: PropTypes.string,
        body: PropTypes.string,
        style: PropTypes.number
    }
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={()=>this.onPress()}>
                <FontAwesome name="reply" size={20} color="gray" />
            </TouchableOpacity>
        );
    }
    onPress(){
        this.props.MainActions.reply(this.props.id, this.props.tootid, this.props.user, this.props.acct, this.props.image, this.props.body);
    }
}

export default connect(state => state,
    (dispatch) => ({
        MainActions: bindActionCreators(MainActions, dispatch)
    })
)(Reply);