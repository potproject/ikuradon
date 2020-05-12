import { combineReducers } from "redux";
import appInitReducer from "./appinit";
import navReducer from "./nav";
import mainReducer from "./main";
import navigationReducer from "./navigation";
import streamingReducer from "./streaming";
import currentUserReducer from "./currentuser";
import configReducer from "./config";
import tootReducer from "./toot";
import imageViewerReducer from "./imageviewer";
// ... other reducers

export default combineReducers({
    appInitReducer,
    navReducer,
    mainReducer,
    navigationReducer,
    streamingReducer,
    currentUserReducer,
    configReducer,
    tootReducer,
    imageViewerReducer
    // ... other reducers
});
