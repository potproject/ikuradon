import * as MainActionTypes from '../actions/actiontypes/main';
import * as MastorowActionTypes from '../actions/actiontypes/mastorow';
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
  federal: {
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

    case MastorowActionTypes.BOOST_MASTOROW:
      if (action.id === null) { return state; }
      return changeItem(action.type,state,action.id,action.boosted);

    case MastorowActionTypes.FAVOURITE_MASTOROW:
      if (action.id === null) { return state; }
      return changeItem(action.type,state,action.id,action.favourited);
    
    default:
      return state;
  }
}

function changeItem(type,state,id,bool) {
  let item;
  switch(type){
    case MastorowActionTypes.BOOST_MASTOROW:
      item = "reblogged";
      break;
    case MastorowActionTypes.FAVOURITE_MASTOROW:
      item = "favourited";
      break;
    default:
      return state;
  }
  let statecopy = Object.assign({}, state);
  const viewTypeArray= ["home","local","federal"];
  for(let viewType of viewTypeArray){
    for (let row = 0; row < statecopy[viewType]["data"].length; row++) {
      if (typeof statecopy[viewType]["data"][row].id !== "undefined" && statecopy[viewType]["data"][row].id === id) {
        statecopy[viewType]["data"][row][item] = bool;
        break;
      }
    }
  }
  return statecopy;
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
