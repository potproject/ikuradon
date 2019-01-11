import * as Nav from "../actions/actiontypes/nav";

const initialState = {};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case Nav.NAV_LOGIN:
            break;
        case Nav.NAV_AUTHORIZE:
            break;
        case Nav.NAV_MAIN:
            break;
        case Nav.NAV_TOOT:
            break;
        case Nav.NAV_TOOT_REPLY:
            break;
        case Nav.NAV_DETAIL:
            break;
        case Nav.NAV_GO_BACK:
            break;
        case Nav.NAV_MEDIAVIEWER:
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return Object.assign({}, state);
}
