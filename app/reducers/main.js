import * as MainActionTypes from "../actions/actiontypes/main";
import * as MastorowActionTypes from "../actions/actiontypes/mastorow";
import { getMinMaxId } from "../util/manageid";

const viewTypeArray = ["home", "local", "federal"];

const initialState = {
    home: {
        data: [],
        refreshing: false,
        loading: false,
        minId: null,
        maxId: null,
        newArrival: 0,
        lastUpdate: 0
    },
    local: {
        data: [],
        refreshing: false,
        loading: false,
        minId: null,
        maxId: null,
        newArrival: 0,
        lastUpdate: 0
    },
    federal: {
        data: [],
        refreshing: false,
        loading: false,
        minId: null,
        maxId: null,
        newArrival: 0,
        lastUpdate: 0
    },
    notifications: {
        data: [],
        refreshing: false,
        loading: false,
        minId: null,
        maxId: null,
        newArrival: 0,
        lastUpdate: 0
    },
    favourites: {
        data: [],
        refreshing: false,
        loading: false,
        minId: null,
        maxId: null,
        newArrival: 0,
        lastUpdate: 0
    },
    bookmarks: {
        data: [],
        refreshing: false,
        loading: false,
        minId: null,
        maxId: null,
        newArrival: 0,
        lastUpdate: 0
    },
};

export default function Main(state = initialState, action = {}) {
    switch (action.type) {
        case MainActionTypes.GETLOCALDATA_MASTOLIST:
            if (action.data === null) {
                return state;
            }
            return Object.assign({}, action.data);
        case MainActionTypes.NEW_UPDATE_MASTOLIST:
        case MainActionTypes.OLD_UPDATE_MASTOLIST:
            let reducerType = action.reducerType;
            let { minId, maxId } = getMinMaxId(state[reducerType].minId, state[reducerType].maxId, action.data);
            let data;
            let newArrival = 0;
            let lastUpdate = Math.floor(new Date().getTime() / 1000);
            if(action.clear){
                data = [...action.data];
            } else if (action.type === MainActionTypes.OLD_UPDATE_MASTOLIST) {
                data = state[reducerType].data.concat(action.data);
            } else {
                newArrival = action.data.length;
                data = action.data.concat(state[reducerType].data);
            }
            let newstate = Object.assign({}, state, {
                [reducerType]: {
                    data,
                    refreshing: false,
                    loading: false,
                    minId,
                    maxId,
                    newArrival,
                    lastUpdate
                },
            });
            return newstate;
        case MainActionTypes.REFRESHING_MASTOLIST:
            return Object.assign({}, state, {
                [action.reducerType]: {
                    data: state[action.reducerType].data,
                    refreshing: true,
                    loading: true,
                    minId: state[action.reducerType].minId,
                    maxId: state[action.reducerType].maxId,
                    newArrival: state[action.reducerType].newArrival,
                    lastUpdate: state[action.reducerType].lastUpdate
                },
            });
        case MainActionTypes.STOP_REFRESHING_MASTOLIST:
            return Object.assign({}, state, {
                [action.reducerType]: {
                    data: state[action.reducerType].data,
                    refreshing: false,
                    loading: false,
                    minId: state[action.reducerType].minId,
                    maxId: state[action.reducerType].maxId,
                    newArrival: state[action.reducerType].newArrival,
                    lastUpdate: state[action.reducerType].lastUpdate,
                },
            });
        case MainActionTypes.LOADING_MASTOLIST:
            return Object.assign({}, state, {
                [action.reducerType]: {
                    data: state[action.reducerType].data,
                    refreshing: false,
                    loading: true,
                    minId: state[action.reducerType].minId,
                    maxId: state[action.reducerType].maxId,
                    newArrival: state[action.reducerType].newArrival,
                    lastUpdate: state[action.reducerType].lastUpdate
                },
            });
        case MainActionTypes.STOP_LOADING_MASTOLIST:
            return Object.assign({}, state, {
                [action.reducerType]: {
                    data: state[action.reducerType].data,
                    refreshing: false,
                    loading: false,
                    minId: state[action.reducerType].minId,
                    maxId: state[action.reducerType].maxId,
                    newArrival: state[action.reducerType].newArrival,
                    lastUpdate: state[action.reducerType].lastUpdate
                },
            });
        case MainActionTypes.HIDE_MASTOLIST:
            for (let viewType of viewTypeArray) {
                state[viewType].data = state[viewType].data.filter(function(v) {
                    return v.id !== action.id;
                });
            }
            return Object.assign({}, state);
        case MainActionTypes.ALLCLEAR_MASTOLIST:
            return Object.assign({}, initialState);

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
        case MastorowActionTypes.BOOKMARK_MASTOROW:
            if (action.id === null) {
                return state;
            }
            return changeItem(action.type, state, action.id, action.bookmarked);
        default:
            return state;
    }
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
        case MastorowActionTypes.BOOKMARK_MASTOROW:
            item = "bookmarked";
            break;
        default:
            return state;
    }
    let statecopy = Object.assign({}, state);
    for (let viewType of viewTypeArray) {
        for (let row = 0; row < statecopy[viewType].data.length; row++) {
            if (typeof statecopy[viewType].data[row].id !== "undefined" && statecopy[viewType].data[row].id === id) {
                if (statecopy[viewType].data[row].reblog === null) {
                    statecopy[viewType].data[row][item] = bool;
                } else {
                    statecopy[viewType].data[row].reblog[item] = bool;
                }
                break;
            }
        }
    }
    return statecopy;
}
