import { combineReducers } from 'redux';
import navReducer from './nav';
import loginReducer from './login';
import authorizeReducer from './authorize';
import homeReducer from './home';
// ... other reducers

export default combineReducers({
  navReducer,
  loginReducer,
  authorizeReducer,
  homeReducer
  // ... other reducers
});