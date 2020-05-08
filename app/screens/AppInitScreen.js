import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as AppInitActions from "../actions/actioncreators/appinit";

function AppInitScreen({ AppInitActions, AppInitReducer }) {
    if(!AppInitReducer.init){
        AppInitActions.appInit();
    }
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/image/icon250.png")} />
        </View>
    );
}

AppInitScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 100,
        height: 100,
    },
});


export default connect(
    state => ({ AppInitReducer: state.appInitReducer }),
    dispatch => ({
        AppInitActions: bindActionCreators(AppInitActions, dispatch)
    })
)(AppInitScreen);