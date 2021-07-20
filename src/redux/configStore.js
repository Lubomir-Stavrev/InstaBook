import { configureStore } from "@reduxjs/toolkit";
import statesReducer from "./states";


export const store = configureStore({
    reducer: {
        states: statesReducer,

    }
})