import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default class VisibilityIcon extends React.Component {
    constructor(props) {
        super(props);
        this.props.visibility = props.visibility;
        this.props.color = props.color;
        this.props.size = props.size;
    }
    render() {
        return <FontAwesome name={this.visibilityIconSet()} size={this.props.size} color={this.props.color} />;
    }
    visibilityIconSet() {
        switch(this.props.visibility){
            case "public":
                return "globe";
            case "unlisted":
                return"unlock-alt";
            case "private":
                return "lock";
            case "direct":
                return "envelope";
            default: 
                return "globe";
        }
    }
}