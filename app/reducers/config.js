import * as ConfigActionTypes from "../actions/actiontypes/config";

const initialState = {
    backgroundImage:null,
    //textsize,textcolor,etc...
};

export default function Config(state = initialState, action = {}) {
    switch (action.type) {
        case ConfigActionTypes.SET_BACKGROUNDIMAGE:
            return Object.assign(state,{
                backgroundImage : action.backgroundImage
            });
        case ConfigActionTypes.DELETE_BACKGROUNDIMAGE:
            return Object.assign(state,{
                backgroundImage : null
            });
        default:
            return state;
    }
}