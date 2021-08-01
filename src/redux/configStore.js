import { configureStore } from "@reduxjs/toolkit";
import postStateReducer from "./postState";


export const store = configureStore({
    reducer: {
        postState: postStateReducer,

    }
})