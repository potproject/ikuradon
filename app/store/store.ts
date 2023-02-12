import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

export default function createStore(){
    return configureStore({
        reducer: reducers
    });
}