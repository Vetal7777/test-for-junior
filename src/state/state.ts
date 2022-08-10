import {StateI} from "../models/state";

export const initialState:StateI = {
    questions: [],
    isLoading: false,
    error: '',
    checked: false,
    test: {
        testing: false,
        quality: 0,
    },
}