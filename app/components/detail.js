import React from "react";
import {
    View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


class Detail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
            </View>
        );
    }
}

export default connect()(Detail);