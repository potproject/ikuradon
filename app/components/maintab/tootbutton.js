import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesome } from "@expo/vector-icons";
import * as MainActions from "../../actions/actioncreators/main";

class TootButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <View>
            <TouchableOpacity onPress={() => this.props.MainActions.toot()} style={styles.view}>
                <FontAwesome name="pencil-square" size={26} color={"#2b90d9"} />
            </TouchableOpacity>
        </View>;
    }
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 4,
        paddingRight: 12,

    },
});

export default connect((state) => {
    return (state);
},
(dispatch) => ({
    MainActions: bindActionCreators(MainActions, dispatch)
})
)(TootButton);