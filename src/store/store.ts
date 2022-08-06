import questionsSlice from "./reduces/questionsSlice";
import {configureStore} from "@reduxjs/toolkit";

export  const setupStore = () => {
    return configureStore(
        {
            reducer: questionsSlice,
        }
    )
}