import * as Action from '../actiontypes/action';

export function openinbrowser(id) {
    return async dispatch => {
        //TODO
        dispatch({ type: Action.ACTION_OPENINBROWSER });
        return;
    };
}

export function share(id) {
    return async dispatch => {
        //TODO
        dispatch({ type: Action.ACTION_SHARE });
        return;
    };
}

export function copy(id) {
    return async dispatch => {
        //TODO
        dispatch({ type: Action.ACTION_COPY });
        return;
    };
}

export function mention(id) {
    return async dispatch => {
        //TODO
        dispatch({ type: Action.ACTION_MENTION });
        return;
    };
}

export function hide(id) {
    return async dispatch => {
        //TODO
        dispatch({ type: Action.ACTION_HIDE });
        return;
    };
}