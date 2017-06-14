import { combineReducers } from 'redux';
import navReducer from './nav';
import loginReducer from './login';
import authorizeReducer from './authorize';
import mainReducer from './main';
// ... other reducers

export default combineReducers({
  navReducer,
  loginReducer,
  authorizeReducer,
  mainReducer
  // ... other reducers
});