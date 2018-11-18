import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppInitActions from "../actions/actioncreators/appinit";

class AppInit extends React.Component {
    constructor(props) {
        super(props);
        props.AppInitActions.appInit();
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../../assets/image/icon250.png")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    logo: {
        width: 100,
        height: 100
    }
});

export default connect(
    state => state,
    dispatch => ({
        AppInitActions: bindActionCreators(AppInitActions, dispatch)
    })
)(AppInit);
