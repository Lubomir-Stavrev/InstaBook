import { configureStore } from "@reduxjs/toolkit";
import postStateReducer from "./postState";
import storieStateReducer from "./storieState";


export const store = configureStore({
    reducer: {
        postState: postStateReducer,
        storieState: storieStateReducer,

    }
})