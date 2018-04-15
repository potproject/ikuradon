import React from "react";
import {
    connect
} from "react-redux";
import {
    addNavigationHelpers,
    StackNavigator
} from "react-navigation";
import {
    bindActionCreators
} from "redux";
import { View, StyleSheet } from "react-native";
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";

import AuthorizeScreen from "../components/authorize";
import MainScreen from "../components/main";
import LoginScreen from "../components/login";
import TootScreen from "../components/toot";
import MediaViewerScreen from "../components/mediaviewer/mediaviewer";

import * as AppInitActions from "../actions/actioncreators/appinit";

import I18n from "../i18n";
import { translate } from "react-i18next";
import MessageBarNavigator from "./messagebarnavigator";

export const AppNavigator = StackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: () => ({
            title: I18n.t("login_title"),
        }),
    },
    Main: {
        screen: MainScreen
    },
    Authorize: {
        screen: AuthorizeScreen,
        navigationOptions: () => ({
            title: I18n.t("authorize_title"),
        }),
    },
    Toot: {
        screen: TootScreen,
        navigationOptions: () => ({
            title: I18n.t("toot_title"),
        }),
    },
    MediaViewer: {
        screen: MediaViewerScreen,
        navigationOptions: () => ({
            title: I18n.t("mediaviewer_title"),
        }),
    }
});
class AppWithNavigationState extends React.Component {
    constructor(props) {
        super(props);
        props.AppInitActions.appInit();
    }
    render() {
        return <View style={styles.container}><AppNavigator 
            screenProps={{ t: I18n.getFixedT() }}
            navigation = {
                addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navReducer,
                    addListener: createReduxBoundAddListener("root")
                })
            }
        />
        <MessageBarNavigator refName="alert" /></View>;
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
export default connect(state => state,
    (dispatch) => (
        Object.assign({
            dispatch
        }, {
            AppInitActions: bindActionCreators(AppInitActions, dispatch)
        })
    )
)(translate("translation",{wait:true})(AppWithNavigationState));