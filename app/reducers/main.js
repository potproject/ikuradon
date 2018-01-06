import * as MainActionTypes from "../actions/actiontypes/main";
import * as MastorowActionTypes from "../actions/actiontypes/mastorow";
import { getMinMaxId } from "../util/manageid";
import { AsyncStorage } from "react-native";

const TIMELINE_LOCAL_AUTOSAVE = true; // Timeline Local Auto Load (Experimental)

const initialState = {
    home: {
        data: [],
        refreshing: false,
        minId: null,
        maxId: null
    },
    local: {
        data: [],
        refreshing: false,
        minId: null,
        maxId: null
    },
    federal: {
        data: [],
        refreshing: false,
        minId: null,
        maxId: null
    },
    notifications: {
        data: [],
        refreshing: false,
        minId: null,
        maxId: null
    }
};

export default function Main(state = initialState, action = {}) {
    switch (action.type) {
        case MainActionTypes.GETLOCALDATA_MASTOLIST:
            if(action.data === null){
                return state;
            }
            return Object.assign({}, action.data);
        case MainActionTypes.NEW_UPDATE_MASTOLIST:
        case MainActionTypes.OLD_UPDATE_MASTOLIST:
            let reducerType = action.reducerType;
            let {
                minId,
                maxId
            } = getMinMaxId(state[reducerType].minId, state[reducerType].maxId, action.data);
            let data;
            if(action.type===MainActionTypes.OLD_UPDATE_MASTOLIST){
                data = state[reducerType].data.concat(action.data);
            }else{
                data = action.data.concat(state[reducerType].data);
            }
            let newstate = Object.assign({}, state, {
                [reducerType]: {
                    data,
                    refreshing: false,
                    minId,
                    maxId
                }
            });
            if(TIMELINE_LOCAL_AUTOSAVE){
                AsyncStorage.setItem("timeline_cache",autoSave(Object.assign({},newstate)));
            }
            return newstate;
        case MainActionTypes.REFRESHING_MASTOLIST:
            return Object.assign({}, state, {
                [action.reducerType]: {
                    data: state[action.reducerType].data,
                    refreshing: true,
                    minId: state[action.reducerType].minId,
                    maxId: state[action.reducerType].maxId
                }
            });

        case MainActionTypes.ALLCLEAR_MASTOLIST:
            return initialState;

        case MastorowActionTypes.BOOST_MASTOROW:
            if (action.id === null) {
                return state;
            }
            return changeItem(action.type, state, action.id, action.boosted);

        case MastorowActionTypes.FAVOURITE_MASTOROW:
            if (action.id === null) {
                return state;
            }
            return changeItem(action.type, state, action.id, action.favourited);
        default:
            return state;
    }
}

function autoSave(state){
    return JSON.stringify(state);
}

function changeItem(type, state, id, bool) {
    let item;
    switch (type) {
        case MastorowActionTypes.BOOST_MASTOROW:
            item = "reblogged";
            break;
        case MastorowActionTypes.FAVOURITE_MASTOROW:
            item = "favourited";
            break;
        default:
            return state;
    }
    let statecopy = Object.assign({}, state);
    const viewTypeArray = ["home", "local", "federal"];
    for (let viewType of viewTypeArray) {
        for (let row = 0; row < statecopy[viewType].data.length; row++) {
            if (typeof statecopy[viewType].data[row].id !== "undefined" && statecopy[viewType].data[row].id === id) {
                if(statecopy[viewType].data[row].reblog === null){
                    statecopy[viewType].data[row][item] = bool;
                }else{
                    statecopy[viewType].data[row].reblog[item] = bool;
                }
                break;
            }
        }
    }
    return statecopy;
}