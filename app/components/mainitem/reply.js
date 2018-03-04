import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as MainActions from "../../actions/actioncreators/main";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <TouchableOpacity style={this.state.style} onPress={()=>this.onPress()}>
                <FontAwesome name="reply" size={20} color="gray" />
            </TouchableOpacity>
        );
    }
    onPress(){
        this.props.MainActions.reply(this.state.id, this.state.tootid, this.state.user, this.state.acct, this.state.image, this.state.body);
    }
}

export default connect(state => state,
    (dispatch) => ({
        MainActions: bindActionCreators(MainActions, dispatch)
    })
)(Reply);