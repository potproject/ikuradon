import * as HomeActionTypes from '../actions/actiontypes/home';

const initialState = {
  data: [],
  refreshing:false,
  minId:null,
  maxId:null
};

export default function Home(state = initialState, action = {}) {
  switch (action.type) {
    case HomeActionTypes.UPDATE_MASTOLIST:
      let {minId,maxId} = getMinMaxId(state.minId,state.maxId,action.data);
      let data = action.data.concat(state.data);
      return {data,refreshing:false,minId,maxId};
    case HomeActionTypes.REFRESHING_MASTOLIST:
      return Object.assign({},state,{refreshing:true});
    default:
      return state;
  }
}

function getMinMaxId(lowest,highest,data) {
  lowest = lowest === null ? Number.POSITIVE_INFINITY : lowest;
  highest = highest === null?Number.NEGATIVE_INFINITY : highest;
  let tmp;
  for (let i = data.length - 1; i >= 0; i--) {
    tmp = data[i].id;
    if (tmp < lowest ) lowest = tmp;
    if (tmp > highest) highest = tmp;
  }
  return {minId:lowest,maxId:highest};
}
