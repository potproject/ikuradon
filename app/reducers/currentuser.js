import * as CurrentUserActionTypes from "../actions/actiontypes/currentuser";

const initialState = {
    user_credentials: null,
    domain: "",
    access_token: ""
};

export default function CurrentUser(state = initialState, action = {}) {
    switch (action.type) {
        case CurrentUserActionTypes.UPDATE_CURRENT_USER:
            return {
                user_credentials: action.user_credentials,
                domain: action.domain,
                access_token: action.access_token
            };
        case CurrentUserActionTypes.DELETED_CURRENT_USER:
            return initialState;
        default:
            return state;
    }
}