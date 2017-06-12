import * as AuthorizeActionTypes from '../actions/actiontypes/authorize';

const initialState = {
  
};

export default function Authorize(state = initialState, action = {}) {
  switch (action.type) {
    case AuthorizeActionTypes.AUTHORIZE_FAILURE:
      return state;
    default:
      return state;
  }
}