import { describe, it, expect } from "vitest";
import {
  scoreReducer as scoreReducerFn,
  setScore,
  updateLeaderboards,
  type VariablesSliceState,
} from "./score.slice";

describe("Score Slice", () => {
  const initialState: VariablesSliceState = {
    score: 0,
    leaderboards: [],
    leaderboardChartData: {},
  };

  it("should return the initial state", () => {
    const state = scoreReducerFn(undefined, { type: "unknown" });
    expect(state.score).toBe(initialState.score);
    expect(state.leaderboards).toEqual(initialState.leaderboards);
    expect(state.leaderboardChartData).toEqual(
      initialState.leaderboardChartData,
    );
  });

  describe("setScore", () => {
    it("should set the score to a new value", () => {
      const state = scoreReducerFn(initialState, setScore(5));

      expect(state.score).toBe(5);
    });

    it("should overwrite the previous score", () => {
      const stateWithScore = {
        ...initialState,
        score: 7,
      };

      const state = scoreReducerFn(stateWithScore, setScore(10));

      expect(state.score).toBe(10);
    });

    it("should handle setting score to 0", () => {
      const stateWithScore = {
        ...initialState,
        score: 5,
      };

      const state = scoreReducerFn(stateWithScore, setScore(0));

      expect(state.score).toBe(0);
    });

    it("should handle high scores", () => {
      const state = scoreReducerFn(initialState, setScore(100));

      expect(state.score).toBe(100);
    });
  });

  describe("updateLeaderboards", () => {
    it("should add a new leaderboard entry", () => {
      const payload = {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        score: 8,
      };

      const state = scoreReducerFn(initialState, updateLeaderboards(payload));

      expect(state.leaderboards).toHaveLength(1);
      expect(state.leaderboards[0].first_name).toBe("John");
      expect(state.leaderboards[0].last_name).toBe("Doe");
      expect(state.leaderboards[0].email).toBe("john@example.com");
      expect(state.leaderboards[0].score).toBe(8);
    });

    it("should add id to leaderboard entry", () => {
      const payload = {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@example.com",
        score: 9,
      };

      const state = scoreReducerFn(initialState, updateLeaderboards(payload));

      expect(state.leaderboards[0]).toHaveProperty("id");
      expect(typeof state.leaderboards[0].id).toBe("number");
    });

    it("should sort leaderboards by score in descending order", () => {
      let state = scoreReducerFn(
        initialState,
        updateLeaderboards({
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          score: 5,
        }),
      );

      state = scoreReducerFn(
        state,
        updateLeaderboards({
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@example.com",
          score: 9,
        }),
      );

      state = scoreReducerFn(
        state,
        updateLeaderboards({
          first_name: "Bob",
          last_name: "Johnson",
          email: "bob@example.com",
          score: 7,
        }),
      );

      expect(state.leaderboards[0].score).toBe(9); // Jane
      expect(state.leaderboards[1].score).toBe(7); // Bob
      expect(state.leaderboards[2].score).toBe(5); // John
    });

    it("should maintain multiple entries with same score", () => {
      let state = scoreReducerFn(
        initialState,
        updateLeaderboards({
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          score: 8,
        }),
      );

      state = scoreReducerFn(
        state,
        updateLeaderboards({
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@example.com",
          score: 8,
        }),
      );

      expect(state.leaderboards).toHaveLength(2);
      expect(state.leaderboards[0].score).toBe(8);
      expect(state.leaderboards[1].score).toBe(8);
    });

    it("should handle score of 0", () => {
      const payload = {
        first_name: "Test",
        last_name: "User",
        email: "test@example.com",
        score: 0,
      };

      const state = scoreReducerFn(initialState, updateLeaderboards(payload));

      expect(state.leaderboards[0].score).toBe(0);
    });

    it("should add email to leaderboardChartData on first entry", () => {
      const payload = {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        score: 8,
      };

      const state = scoreReducerFn(initialState, updateLeaderboards(payload));

      expect(state.leaderboardChartData["john@example.com"]).toBeDefined();
      expect(state.leaderboardChartData["john@example.com"]).toHaveLength(1);
      expect(state.leaderboardChartData["john@example.com"][0].score).toBe(8);
      expect(typeof state.leaderboardChartData["john@example.com"][0].day).toBe(
        "string",
      );
    });

    it("should add new score to existing email in leaderboardChartData", () => {
      let state = scoreReducerFn(
        initialState,
        updateLeaderboards({
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          score: 5,
        }),
      );

      state = scoreReducerFn(
        state,
        updateLeaderboards({
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          score: 8,
        }),
      );

      expect(state.leaderboardChartData["john@example.com"]).toHaveLength(2);
      expect(state.leaderboardChartData["john@example.com"][0].score).toBe(5);
      expect(state.leaderboardChartData["john@example.com"][1].score).toBe(8);
    });

    it("should handle multiple emails in leaderboardChartData", () => {
      let state = scoreReducerFn(
        initialState,
        updateLeaderboards({
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          score: 8,
        }),
      );

      state = scoreReducerFn(
        state,
        updateLeaderboards({
          first_name: "Jane",
          last_name: "Smith",
          email: "jane@example.com",
          score: 9,
        }),
      );

      expect(Object.keys(state.leaderboardChartData)).toHaveLength(2);
      expect(state.leaderboardChartData["john@example.com"]).toHaveLength(1);
      expect(state.leaderboardChartData["jane@example.com"]).toHaveLength(1);
    });
  });

  describe("combined actions", () => {
    it("should handle setScore and updateLeaderboards together", () => {
      let state = scoreReducerFn(initialState, setScore(10));

      state = scoreReducerFn(
        state,
        updateLeaderboards({
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          score: 10,
        }),
      );

      expect(state.score).toBe(10);
      expect(state.leaderboards).toHaveLength(1);
      expect(state.leaderboards[0].score).toBe(10);
    });
  });
});
