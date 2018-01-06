import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:props.id,
            style:props.style
        };
    }
    render() {
        return (
            <TouchableOpacity style={this.state.style} onPress={this.onPress.bind(this.state.id)}>
                <FontAwesome name="reply" size={20} color="gray" />
            </TouchableOpacity>
        );
    }
    onPress(id){

    }
}