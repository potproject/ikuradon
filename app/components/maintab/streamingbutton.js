import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as StreamingActions from "../../actions/actioncreators/streaming";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class StreamingButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            enabled:props.StreamingReducer[props.type],
            type: props.type
        };
    }
    render() {
        return <View>
            <TouchableOpacity onPress={() => this.streamSwitch()} style={styles.view}>
                <FontAwesome name="feed" size={24} color={this.setColor(this.state.enabled)} />
            </TouchableOpacity>
        </View>;
    }
    setColor(enabled) {
        return enabled === true ? "#2b90d9" : "gray";
    }
    streamSwitch() {
        let enabled = !this.state.enabled;
        enabled ? this.props.StreamingActions.start(this.state.type) : this.props.StreamingActions.stop(this.state.type);
        this.setState({ enabled });
    }
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 4,
        paddingButtom: 4,
        paddingLeft: 12,
        paddingRight: 4,
    },
});

export default connect((state) => {
    return ({
        StreamingReducer : state.streamingReducer
    });
},
(dispatch) => ({
    StreamingActions: bindActionCreators(StreamingActions, dispatch),
})
)(StreamingButton);