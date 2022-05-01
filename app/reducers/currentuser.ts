import * as CurrentUserActionTypes from "../actions/actiontypes/currentuser";

export const initialState = {
    user_credentials: null,
    domain: "",
    access_token: "",
    notification_count: 0,
    instance: null
};

export default function CurrentUser(state = initialState, action = {}) {
    switch (action.type) {
        case CurrentUserActionTypes.UPDATE_CURRENT_USER:
            return {
                user_credentials: action.user_credentials,
                domain: action.domain,
                access_token: action.access_token,
                notification_count: 0,
                instance: action.instance
            };
        case CurrentUserActionTypes.DELETED_CURRENT_USER:
            return Object.assign({}, initialState);
        case CurrentUserActionTypes.NOTIFICATION_PUSH:
            let newState = Object.assign({}, state);
            newState.notification_count += 1;
            return newState;
        case CurrentUserActionTypes.NOTIFICATION_CLEAR:
            return Object.assign({}, state, { notification_count: 0 });
        default:
            return state;
    }
}
