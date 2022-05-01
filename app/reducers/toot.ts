import * as Toot from "../actions/actiontypes/toot";

export const initialState = {
    tootWaiting: false
};

export default function reducer(state = initialState, action = {}) {
    let newstate = Object.assign({}, state);
    switch (action.type) {
        case Toot.TOOT_WAITING:
            return Object.assign({}, { tootWaiting: true });
        case Toot.TOOT_FAILURE:
        case Toot.TOOT_OK:
            return Object.assign({}, { tootWaiting: false });
        default:
            return newstate;
    }
}
