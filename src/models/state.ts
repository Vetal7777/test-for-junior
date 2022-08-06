import questionsSlice from "../store/reduces/questionsSlice";

export interface NewQuestionI {
    question: string;
    answer: string;
}

export interface QuestionI extends NewQuestionI{
    id: string;
}
export interface StateI {
    questions: QuestionI[] | [],
    isLoading: boolean;
    error: string;
    checked: boolean;
    testing: boolean;
}

export type RootState = ReturnType<typeof questionsSlice>;