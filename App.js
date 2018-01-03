import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { createMiddleware } from "./app/middleware";
import AppWithNavigationState from "./app/navigators/appnavigator";

import reducers from "./app/reducers";
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