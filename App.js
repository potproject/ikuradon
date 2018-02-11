import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import { createMiddleware } from "./app/middleware";
import AppWithNavigationState from "./app/navigators/appnavigator";

import reducers from "./app/reducers";
// other imports...

// create store...
const store = createStore(
    reducers,
    applyMiddleware(...createMiddleware()),
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}