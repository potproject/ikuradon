import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createMiddleware } from "./middleware";
import { addNavigationHelpers } from 'react-navigation';
import AppWithNavigationState from './navigators/appnavigator';

import reducers from './reducers';
// other imports...

// create store...
const store = compose(
  applyMiddleware(...createMiddleware())
)(createStore)(reducers);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}