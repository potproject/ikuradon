import React from "react";
import IconBadge from "react-native-icon-badge";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class NotificationsIconBadge extends React.Component {
    static propTypes = {
        color: PropTypes.string,
        count: PropTypes.number
    };
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.navReducer.count === "number") {
            this.props.count = nextProps.navReducer.count;
        }
    }
    render() {
        return (
            <IconBadge
                MainElement={<FontAwesome name="bell" size={26} color={this.props.color} />}
                BadgeElement={<Text style={{ color: "#FFFFFF" }}>{this.props.count}</Text>}
                IconBadgeStyle={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    minWidth: 20,
                    height: 20,
                    borderRadius: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FF0000"
                }}
                Hidden={this.props.count < 1}
            />
        );
    }
}

export default connect(state => {
    return {
        navReducer: state.navReducer
    };
})(NotificationsIconBadge);
