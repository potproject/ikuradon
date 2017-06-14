import * as MainActionTypes from '../actions/actiontypes/main';

const initialState = {
  home: {
    data: [],
    refreshing: false,
    minId: null,
    maxId: null
  },
  local: {
    data: [],
    refreshing: false,
    minId: null,
    maxId: null
  },
};

export default function Main(state = initialState, action = {}) {
  switch (action.type) {
    case MainActionTypes.UPDATE_MASTOLIST:
      let reducerType = action.reducerType;
      let { minId, maxId } = getMinMaxId(state[reducerType]["minId"], state[reducerType]["maxId"], action.data);
      let data = action.data.concat(state[reducerType]["data"]);
      return Object.assign({}, state, { [reducerType]: { data, refreshing: false, minId, maxId } });

    case MainActionTypes.REFRESHING_MASTOLIST:
      return Object.assign({}, state, { [reducerType]: { refreshing: true } });

    default:
      return state;
  }
}

function getMinMaxId(lowest, highest, data) {
  lowest = lowest === null ? Number.POSITIVE_INFINITY : lowest;
  highest = highest === null ? Number.NEGATIVE_INFINITY : highest;
  let tmp;
  for (let i = data.length - 1; i >= 0; i--) {
    tmp = data[i].id;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }
  return { minId: lowest, maxId: highest };
}
