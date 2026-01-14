import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Difficulty, ICategory, QuestionType } from "../types";

export interface VariablesSliceState {
  categories: ICategory[];
  isFetchedCategories: boolean;
  // questions: IQuestion[];
  current_question_index: number;
  current_category: number;
  current_difficulty: Difficulty;
  current_type: QuestionType;
  current_amount: number;
}

const initialState: VariablesSliceState = {
  categories: [],
  isFetchedCategories: false,
  // questions: [],
  current_question_index: 0,
  current_category: 0,
  current_difficulty: "" as Difficulty,
  current_type: "" as QuestionType,
  current_amount: 0,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
      state.isFetchedCategories = true;
    },
    // setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
    //   state.questions = action.payload;
    // },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.current_question_index = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<number>) => {
      state.current_category = action.payload;
    },
    setCurrentDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.current_difficulty = action.payload;
    },
    setCurrentType: (state, action: PayloadAction<QuestionType>) => {
      state.current_type = action.payload;
    },
    setCurrentAmount: (state, action: PayloadAction<number>) => {
      state.current_amount = action.payload;
    },
  },
});

export const {
  setCategories,
  // setQuestions,
  setCurrentQuestionIndex,
  setCurrentCategory,
  setCurrentDifficulty,
  setCurrentType,
  setCurrentAmount,
} = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;
