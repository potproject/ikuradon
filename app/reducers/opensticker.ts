import * as OpenStickerActionTypes from "../actions/actiontypes/opensticker";
import * as Storage from "../util/storage";
import * as CONST_Storage from "../constants/storage";

export const initialState = {
    use: false,
    server: "https://s.0px.io/json",
    data: {}
};

export default function OpenSticker(state = initialState, action = {}) {
    let newstate = state;
    switch (action.type) {
        case OpenStickerActionTypes.OPENSTICKER_LOAD:
            newstate = Object.assign({}, action.openSticker);
            break;
        case OpenStickerActionTypes.OPENSTICKER_ON:
            newstate = Object.assign({}, { use:true, server:action.server, data:action.data });
            break;
        case OpenStickerActionTypes.OPENSTICKER_OFF:
            newstate = Object.assign({}, state, { use:false, data:{} });
            break;
    }
    if (state !== newstate) {
        Storage.setItem(CONST_Storage.OpenSticker, newstate);
    }
    return newstate;
}
