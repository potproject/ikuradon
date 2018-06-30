import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as MainActions from "../../actions/actioncreators/main";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            id:props.id,
            tootid:props.tootid,
            user:props.user,
            acct:props.acct,
            image:props.image,
            body:props.body,
            style:props.style
        };
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