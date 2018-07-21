import * as CurrentUserActionTypes from "../actions/actiontypes/currentuser";

const initialState = {
    user_credentials: null,
    domain: "",
    access_token: "",
    notification_count: 0
};

export default function CurrentUser(state = initialState, action = {}) {
    switch (action.type) {
        case CurrentUserActionTypes.UPDATE_CURRENT_USER:
            return {
                user_credentials: action.user_credentials,
                domain: action.domain,
                access_token: action.access_token,
                notification_count: 0,
            };
        case CurrentUserActionTypes.DELETED_CURRENT_USER:
            return initialState;
        case CurrentUserActionTypes.NOTIFICATION_PUSH:
            return Object.assign({}, state, { notification_count: state.notification_count++ });
        case CurrentUserActionTypes.NOTIFICATION_CLEAR:
            return Object.assign({}, state, { notification_count: 0 });
        default:
            return state;
    }
}