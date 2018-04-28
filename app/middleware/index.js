import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import { debug } from "../constants/debug";

export function createMiddleware(){
    const logger = createLogger();
    const navigationHelper = createReactNavigationReduxMiddleware(
        "root",
        state => state.navReducer,
    );
    let middlewares = [thunk,navigationHelper];
    if(debug){
        middlewares.push(logger);
    }
    return middlewares;
}