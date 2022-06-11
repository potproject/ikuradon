import { createReducer } from "@reduxjs/toolkit";
import * as MainActionTypes from "../actions/actiontypes/main";
import * as MastorowActionTypes from "../actions/actiontypes/mastorow";
import { getFirstAndLastID } from "../util/manageid";

const viewTypeArray = ["home", "local", "federal"];

export const initialState = {
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

export default createReducer(initialState, (builder) => {
    builder
        .addCase(MainActionTypes.REFRESHING_MASTOLIST, (state, action) => {
            state[action.reducerType].refreshing = true;
            state[action.reducerType].loading = true;
        })
        .addCase(MainActionTypes.STOP_REFRESHING_MASTOLIST, (state, action) => {
            state[action.reducerType].refreshing = false;
            state[action.reducerType].loading = false;
        })
        .addCase(MainActionTypes.LOADING_MASTOLIST, (state, action) => {
            state[action.reducerType].refreshing = false;
            state[action.reducerType].loading = true;
        })
        .addCase(MainActionTypes.STOP_LOADING_MASTOLIST, (state, action) => {
            state[action.reducerType].refreshing = false;
            state[action.reducerType].loading = false;
        })
        .addCase(MainActionTypes.HIDE_MASTOLIST, (state, action) => {
            for (let viewType of viewTypeArray) {
                state[viewType].data = state[viewType].data.filter(function(v) {
                    return v.id !== action.id;
                });
            }
        })
        .addCase(MainActionTypes.ALLCLEAR_MASTOLIST, (state, action) => {
            return initialState;
        })
        .addCase(MastorowActionTypes.BOOST_MASTOROW, (state, action) => {
            if (action.id === null) {
                return state;
            }
            return changeItem(action.type, state, action.id, action.boosted);
        })
        .addCase(MastorowActionTypes.FAVOURITE_MASTOROW, (state, action) => {
            if (action.id === null) {
                return state;
            }
            return changeItem(action.type, state, action.id, action.favourited);
        })
        .addCase(MastorowActionTypes.BOOKMARK_MASTOROW, (state, action) => {
            if (action.id === null) {
                return state;
            }
            return changeItem(action.type, state, action.id, action.bookmarked);
        })
        .addCase(MastorowActionTypes.REACTION_MASTOROW, (state, action) => {
            if (action.id === null) {
                return state;
            }
            return changeItemReaction(state, action.id, action.emoji_reactions, action.emojis);
        })
        .addMatcher(({ type })=>type === MainActionTypes.NEW_UPDATE_MASTOLIST || type === MainActionTypes.OLD_UPDATE_MASTOLIST
            , (state, action) => {
                let reducerType = action.reducerType;
                let data;
                let newArrival = 0;
                let lastUpdate = Math.floor(new Date().getTime() / 1000);
                if (action.clear){
                    data = [...action.data];
                } else if (action.type === MainActionTypes.OLD_UPDATE_MASTOLIST) {
                    data = state[reducerType].data.concat(action.data);
                } else {
                    newArrival = action.data.length;
                    data = action.data.concat(state[reducerType].data);
                }
                const { minId, maxId } = getFirstAndLastID(data);
                state[reducerType] = {
                    data,
                    refreshing: false,
                    loading: false,
                    minId,
                    maxId,
                    newArrival,
                    lastUpdate
                };
            });
});

export function changeItem(type, state, id, bool) {
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
    // Deep Copy
    let statecopy = JSON.parse(JSON.stringify(state));
    for (let viewType of viewTypeArray) {
        for (let row = 0; row < statecopy[viewType].data.length; row++) {
            if (typeof statecopy[viewType].data[row].id !== "undefined" && statecopy[viewType].data[row].id === id) {
                statecopy[viewType].data[row][item] = bool;
                break;
            }
        }
    }
    return statecopy;
}

export function changeItemReaction(state, id, emoji_reactions, emojis) {
    // Deep Copy
    let statecopy = JSON.parse(JSON.stringify(state));
    for (let viewType of viewTypeArray) {
        for (let row = 0; row < statecopy[viewType].data.length; row++) {
            if (typeof statecopy[viewType].data[row].id !== "undefined" && statecopy[viewType].data[row].id === id) {
                statecopy[viewType].data[row].emoji_reactions = emoji_reactions;
                statecopy[viewType].data[row].emojis = emojis;
                break;
            }
        }
    }
    return statecopy;
}