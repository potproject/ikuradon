import * as ImageViewer from "../actions/actiontypes/imageviewer";

const initialState = {
    data: [],
    index: 0,
    visible: false,
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case ImageViewer.IMAGEVIEWER_OPEN:
            return Object.assign({}, state, { 
                data: action.data,
                index: action.index,
                visible: true
            });
        case ImageViewer.IMAGEVIEWER_CLOSE:
            return Object.assign({}, state, {
                index: 0,
                visible: false
            });
    }
    return state;
}
