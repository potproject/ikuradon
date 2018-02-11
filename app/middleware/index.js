import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

export function createMiddleware(){
    const logger = createLogger();
    const navigationHelper = createReactNavigationReduxMiddleware(
        "root",
        state => state.navReducer,
    );
    return [logger,thunk,navigationHelper];
}