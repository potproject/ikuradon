import * as ConfigActionTypes from "../actions/actiontypes/config";
import { AsyncStorage } from "react-native";

const initialState = {
    backgroundImage: null,

    invisible: {
        //表示設定 trueで非表示
        home: false,
        local: false,
        federal: false,
        notifications: false
    },

    smartMode: false
    //textsize,textcolor,etc...
};

export default function Config(state = initialState, action = {}) {
    let newstate;
    switch (action.type) {
        case ConfigActionTypes.SET_BACKGROUNDIMAGE:
            newstate = Object.assign({}, state, {
                backgroundImage: action.backgroundImage
            });
            break;
        case ConfigActionTypes.DELETE_BACKGROUNDIMAGE:
            newstate = Object.assign({}, state, {
                backgroundImage: null
            });
            break;
        case ConfigActionTypes.INVISIBLE_SETTING:
            let mergeInvisible = Object.assign(state.invisible, action.invisible);
            newstate = Object.assign({}, state, { invisible: mergeInvisible });
            break;
        case ConfigActionTypes.SMART_MODE:
            newstate = Object.assign({}, state, {
                smartMode: action.smartMode
            });
            break;

        case ConfigActionTypes.CONFIG_LOAD:
            newstate = Object.assign({}, action.config);
            break;
        case ConfigActionTypes.CONFIG_RESET:
            newstate = initialState;
            break;
        default:
            newstate = state;
            break;
    }
    if (state !== newstate) {
        AsyncStorage.setItem("config", JSON.stringify(newstate));
    }
    return newstate;
}
