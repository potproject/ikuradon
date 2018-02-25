import * as Navigation from "../actions/actiontypes/navigation";

export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        //ナビゲーションが発動時
        case Navigation.NAVIGATE:
            break;
        //ナビゲーションの完了時
        case Navigation.COMPLETE_TRANSITION:
            break;
    }
    return state;
}