import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

export function createMiddleware(){
    const logger = createLogger();
    return [logger,thunk];
}