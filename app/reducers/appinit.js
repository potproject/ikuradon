import * as AppInit from "../actions/actiontypes/appinit";

const initialState = {
    init: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case AppInit.APPINIT_COMPLETE:
            state = Object.assign({}, state, {
                init: true,
            });
            break;
    }
    return state;
}
