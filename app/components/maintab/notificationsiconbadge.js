import React from "react";
import IconBadge from "react-native-icon-badge";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { connect } from "react-redux";

class NotificationsIconBadge extends React.Component {
    constructor(props) {
        super(props);
        this.color = props.color;
        this.props = {
            count: props.count
        };
    }
    componentWillReceiveProps(nextProps) {
        if(typeof nextProps.navReducer.count === "number"){
            this.setState(
                {count: nextProps.navReducer.count}
            );
        }
    }
    render() {
        return <IconBadge
            MainElement={
                <FontAwesome name="bell" size={26} color={this.color} />
            }
            BadgeElement={
                <Text style={{ color: "#FFFFFF" }}>{this.props.count}</Text>
            }
            IconBadgeStyle={
                {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    minWidth: 20,
                    height: 20,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FF0000"
                }
            }
            Hidden={this.props.count < 1}
        />;
    }
}

export default connect(
    state => {
        return {
            navReducer: state.navReducer
        };
    }
)(NotificationsIconBadge);