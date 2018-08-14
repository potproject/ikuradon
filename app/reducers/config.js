import * as ConfigActionTypes from "../actions/actiontypes/config";
import { AsyncStorage } from "react-native";

const initialState = {
    backgroundImage:null,
    //textsize,textcolor,etc...
};

export default function Config(state = initialState, action = {}) {
    let newstate;
    switch (action.type) {
        case ConfigActionTypes.SET_BACKGROUNDIMAGE:
            newstate = Object.assign({},state,{
                backgroundImage : action.backgroundImage
            });
            break;
        case ConfigActionTypes.DELETE_BACKGROUNDIMAGE:
            newstate = Object.assign({},state,{
                backgroundImage : null
            });
            break;
        case ConfigActionTypes.CONFIG_LOAD:
            newstate = Object.assign({},action.config);
            break;
        case ConfigActionTypes.CONFIG_RESET:
            newstate = initialState;
            break;
        default:
            newstate = state;
            break;
    }
    if(state !== newstate){
        AsyncStorage.setItem("config",JSON.stringify(newstate));
    }
    return newstate;
}