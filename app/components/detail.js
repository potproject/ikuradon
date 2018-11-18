import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <View />;
    }
}

export default connect()(Detail);
