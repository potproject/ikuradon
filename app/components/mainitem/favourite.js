import React from "react";
import { TouchableOpacity  } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as MastorowActions from "../../actions/actioncreators/mastorow";

class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            id:props.id,
            tootid:props.tootid,
            style:props.style,
            favourited:props.favourited
        };
    }
    componentWillReceiveProps(nextProps){
        if(this.props.favourited !== nextProps.favourited){
            this.props.favourited = nextProps.favourited;
        }
    }
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={()=>this.props.MastorowActions.favourite(this.props.id,this.props.tootid,!this.props.favourited)}>
                <FontAwesome name="star" size={20} color={this.setColor(this.props.favourited)} />
            </TouchableOpacity>
        );
    }
    setColor(favourited){
        return favourited ? "#ca8f04" : "gray";
    }
}

export default connect(state => state,
    (dispatch) => ({
        MastorowActions:bindActionCreators(MastorowActions,dispatch)
    })
)(Favourite);