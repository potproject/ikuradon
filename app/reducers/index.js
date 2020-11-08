import { combineReducers } from "redux";
import appInitReducer from "./appinit";
import mainReducer from "./main";
import navigationReducer from "./navigation";
import streamingReducer from "./streaming";
import currentUserReducer from "./currentuser";
import configReducer from "./config";
import tootReducer from "./toot";
import imageViewerReducer from "./imageviewer";
import pushNotificationReducer from "./pushnotification";
import openStickerReducer from "./opensticker";
// ... other reducers

export default combineReducers({
    appInitReducer,
    mainReducer,
    navigationReducer,
    streamingReducer,
    currentUserReducer,
    configReducer,
    tootReducer,
    imageViewerReducer,
    pushNotificationReducer,
    openStickerReducer
    // ... other reducers
});
