import * as Detail from "../actions/actiontypes/detail";

export const initialState = {
    data: {},
    loaded: null, // true=完了、false=失敗、null=存在しない
};


export default function detail(state = initialState, action = {}) {
    switch (action.type) {
        //open
        case Detail.DETAIL_GET:
            return Object.assign({}, state, { 
                data: action.data,
                loaded: action.loaded
            });
        //ナビゲーションの完了時
        case Detail.DETAIL_RESET:
            return { data: {}, loaded: null };
    }
    return state;
}
