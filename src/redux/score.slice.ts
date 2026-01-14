import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILeaderboards } from "../types";

export interface VariablesSliceState {
  score: number;
  leaderboards: ILeaderboards[];
}

const initialState: VariablesSliceState = {
  score: 0,
  leaderboards: [],
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    updateLeaderboards: (state, action: PayloadAction<ILeaderboards>) => {
      state.leaderboards.push(action.payload);

      // SORT DESC BY SCORE
      state.leaderboards.sort((a, b) => b.score - a.score);
    },
  },
});

export const { setScore, updateLeaderboards } = scoreSlice.actions;

export const scoreReducer = scoreSlice.reducer;
