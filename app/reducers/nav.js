import {
    addNavigationHelpers
} from "react-navigation";
import {
    AppNavigator
} from "../navigators/appnavigator";
import {
    NavigationActions
} from "react-navigation";
import * as Nav from "../actions/actiontypes/nav";

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams("Login"));

export default function reducer(state = initialState, action = {}) {
    let nextState;
    switch (action.type) {
        case Nav.NAV_LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "Login"
                        })
                    ]
                })
            );
            break;
        case Nav.NAV_AUTHORIZE:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "Authorize"
                }),
                Object.assign(state, {
                    domain: action.domain,
                    url: action.url,
                    client_id: action.client_id,
                    client_secret: action.client_secret
                })
            );
            break;
        case Nav.NAV_MAIN:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: "Main"
                        })
                    ]
                }),
                Object.assign(state, {
                    domain: action.domain,
                    access_token: action.access_token,
                })
            );
            break;
        case Nav.NAV_TOOT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "Toot"
                }),
                Object.assign({}, state)
            );
            break;
        case Nav.NAV_GO_BACK:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                Object.assign({}, state)
            );
            break;
        case Nav.NAV_IMAGEVIEWER:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "ImageViewer",
                    params: {
                        media_attachments: action.media_attachments,
                        index: action.index
                    }
                }),
                Object.assign({}, state)
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}