import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILeaderboards } from "../types";

export interface ILeaderboardPayload {
  first_name: string;
  last_name: string;
  email: string;
  score: number;
}
export interface ScoreItem {
  day: string;
  score: number;
}

export interface ScoresByEmail {
  [email: string]: ScoreItem[];
}

export interface VariablesSliceState {
  score: number;
  leaderboards: ILeaderboards[];
  leaderboardChartData: ScoresByEmail;
}

const initialState: VariablesSliceState = {
  score: 0,
  leaderboards: [],
  leaderboardChartData: {},
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    updateLeaderboards: (state, action: PayloadAction<ILeaderboardPayload>) => {
      const currentDate = Date.now();
      state.leaderboards.push({
        id: currentDate,
        ...action.payload,
      });

      // SORT DESC BY SCORE
      state.leaderboards.sort((a, b) => b.score - a.score);

      // Update leaderboardChartData
      const { email, score } = action.payload;
      const day = String(currentDate);

      if (state.leaderboardChartData[email]) {
        state.leaderboardChartData[email].push({ day, score });
      } else {
        state.leaderboardChartData[email] = [{ day, score }];
      }
    },
  },
});

export const { setScore, updateLeaderboards } = scoreSlice.actions;

export const scoreReducer = scoreSlice.reducer;
