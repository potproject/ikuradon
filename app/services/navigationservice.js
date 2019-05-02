//React Navigation without Redux integration
import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

// get Dispatcher
// Using Example
// --- code ---
// NavigationService.getDispatch()(
//    NavigationActions.navigate({
//        routeName: RouterName.Main
//    })
// );
function getDispatch() {
    return _navigator.dispatch;
}

// Back
function back() {
    _navigator.dispatch(NavigationActions.back());
}

// Navigate
function navigate({ routeName, params, action, key }) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
            action,
            key
        })
    );
}

// All Reset And Navigation
function resetAndNavigate({ routeName }) {
    _navigator.dispatch(
        StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        })
    );
}

export default {
    back,
    navigate,
    resetAndNavigate,
    getDispatch,
    setTopLevelNavigator
};
