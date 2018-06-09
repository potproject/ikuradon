import {
    AppNavigator
} from "../navigators/appnavigator";
import {
    NavigationActions,
    StackActions
} from "react-navigation";
import * as RouterName from "../constants/routername";
import * as Nav from "../actions/actiontypes/nav";

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(RouterName.Login));

export default function reducer(state = initialState, action = {}) {
    let nextState;
    switch (action.type) {
        case Nav.NAV_LOGIN:
            nextState = AppNavigator.router.getStateForAction(
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: RouterName.Login
                        })
                    ]
                })
            );
            break;
        case Nav.NAV_AUTHORIZE:
            nextState = AppNavigator.router.getStateForAction(
                StackActions.push({
                    routeName: RouterName.Authorize
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
                StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: RouterName.Main
                        })
                    ]
                }),
                Object.assign(state, {})
            );
            break;
        case Nav.NAV_TOOT:
            nextState = AppNavigator.router.getStateForAction(
                StackActions.push({
                    routeName: RouterName.Toot
                }),
                Object.assign(state, { reply: null })
            );
            break;
        case Nav.NAV_TOOT_REPLY:
            nextState = AppNavigator.router.getStateForAction(
                StackActions.push({
                    routeName: RouterName.Toot
                }),
                Object.assign(state, { reply: action.data })
            );
            break;
        case Nav.NAV_GO_BACK:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                Object.assign({}, state)
            );
            break;
        case Nav.NAV_MEDIAVIEWER:
            nextState = AppNavigator.router.getStateForAction(
                StackActions.push({
                    routeName: RouterName.MediaViewer,
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