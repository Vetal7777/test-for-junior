import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "../../state/state";
import {QuestionI} from "../../models/state";

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        failed(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload;
        },
        fetch(state) {
            state.isLoading = true;
        },
        getSuccess(state, action: PayloadAction<QuestionI[]>) {
            state.isLoading = false;
            state.error = "";
            state.questions = action.payload;
        },
        deleteSuccess(state, action: PayloadAction<string>) {
            state.error = "";
            state.isLoading = false;
            state.questions = state.questions.filter(question => question.id !== action.payload)
        },
        putSuccess(state, action: PayloadAction<QuestionI>){
            state.isLoading = false;
            state.error = '';
            state.questions = state.questions.map(question => question.id === action.payload.id ? action.payload : question);
        },
        postSuccess(state, action: PayloadAction<QuestionI>){
            state.isLoading = false;
            state.error = '';
            state.questions = [...state.questions,action.payload];
        },
        check(state,action: PayloadAction<boolean>){
            state.checked = action.payload;
        },
        testing(state,action:PayloadAction<boolean>){
            state.test.testing = action.payload;
        },
        changeQuality(state,action:PayloadAction<number>){
            state.test.quality = action.payload;
        }
    }
})

export default questionSlice.reducer;