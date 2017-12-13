import * as Action from "../actiontypes/action";

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