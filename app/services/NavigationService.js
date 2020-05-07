//React Navigation without Redux integration
import { CommonActions } from "@react-navigation/native";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

// get Dispatcher
// Using Example
// --- code ---
// NavigationService.getDispatch()(
//    CommonActions.navigate({
//        routeName: RouterName.Main
//    })
// );
function getDispatch() {
    return _navigator.dispatch;
}

// Back
function back() {
    _navigator.dispatch(CommonActions.back());
}

// Navigate
function navigate({ name, key, params }) {
    _navigator.dispatch(
        CommonActions.navigate({
            name,
            key,
            params
        })
    );
}

// All Reset And Navigation
function resetAndNavigate({ name }) {
    _navigator.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name }]
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