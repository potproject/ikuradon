import {
    combineReducers
} from "redux";
import navReducer from "./nav";
import loginReducer from "./login";
import authorizeReducer from "./authorize";
import mainReducer from "./main";
import navigationReducer from "./navigation";
import streamingReducer from "./streaming";
// ... other reducers

export default combineReducers({
    navReducer,
    loginReducer,
    authorizeReducer,
    mainReducer,
    navigationReducer,
    streamingReducer
    // ... other reducers
});