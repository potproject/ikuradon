import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppInitActions from "../actions/actioncreators/appinit";

class AppInit extends React.Component {
    constructor(props) {
        super(props);
        props.AppInitActions.appInit();
    }
    render() {
        return <View style={styles.container}>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default connect(state => state,
    (dispatch) => ({
        AppInitActions: bindActionCreators(AppInitActions, dispatch)
    })
)(AppInit);