import React from "react";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { reduxifyNavigator } from "react-navigation-redux-helpers";

import { createMiddleware } from "../middleware";

import AppInitScreen from "../components/appinit";
import AuthorizeScreen from "../components/authorize";
import MainScreen from "../components/main";
import LoginScreen from "../components/login";
import TootScreen from "../components/toot";
import MediaViewerScreen from "../components/mediaviewer/mediaviewer";

import StreamingButton from "../components/maintab/streamingbutton";
import TootButton from "../components/maintab/tootbutton";

import I18n from "../i18n";
import * as RouterName from "../constants/routername";

export const middleware = createMiddleware();
export const AppNavigator = createStackNavigator({
    [RouterName.AppInit]: AppInitScreen,
    [RouterName.Login]: LoginScreen,
    [RouterName.Main]: MainScreen,
    [RouterName.Authorize]: AuthorizeScreen,
    [RouterName.Toot]: TootScreen,
    [RouterName.MediaViewer]: MediaViewerScreen,
},{
    navigationOptions: ({ navigation })=>{
        let routeName = navigation.state.routeName;
        if(RouterName.Main === navigation.state.routeName){
            return {
                headerTitle: I18n.t(`navigation_${navigation.state.routes[navigation.state.index].routeName}`),
                headerLeft: navigation.state.routes[navigation.state.index].routeName === "home" ? <StreamingButton type={navigation.state.routes[navigation.state.index].routeName} /> : null,
                headerRight:  <TootButton />,
            };
        }

        return {
            title: I18n.t(`${routeName}_title`)
        };
    }
});

let AppWithNavigationState = reduxifyNavigator(AppNavigator, "root");
export default connect((state => ({state: state.navReducer})),
)(AppWithNavigationState);