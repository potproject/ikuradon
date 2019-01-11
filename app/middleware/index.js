import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import { debug } from "../constants/debug";

export function createMiddleware() {
    const logger = createLogger();
    let middlewares = [thunk];
    if (debug) {
        middlewares.push(logger);
    }
    return middlewares;
}
