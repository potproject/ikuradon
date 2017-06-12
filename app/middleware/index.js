import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

export function createMiddleware(){
    const logger = createLogger();
    return [logger,thunk]
}