import { describe, it, expect } from "vitest";
import {
  questionsReducer as questionsReducerFn,
  setCategories,
  setCurrentQuestionIndex,
  setCurrentCategory,
  setCurrentDifficulty,
  setCurrentType,
  setCurrentAmount,
  type VariablesSliceState,
} from "./questions.slice";

describe("Questions Slice", () => {
  const initialState: VariablesSliceState = {
    categories: [],
    isFetchedCategories: false,
    current_question_index: 0,
    current_category: 0,
    current_difficulty: "" as VariablesSliceState["current_difficulty"],
    current_type: "" as VariablesSliceState["current_type"],
    current_amount: 0,
  };

  it("should return the initial state", () => {
    const state = questionsReducerFn(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  describe("setCategories", () => {
    it("should set categories and mark as fetched", () => {
      const categories = [
        { id: 9, name: "General Knowledge" },
        { id: 10, name: "Entertainment: Books" },
      ];

      const state = questionsReducerFn(initialState, setCategories(categories));

      expect(state.categories).toEqual(categories);
      expect(state.isFetchedCategories).toBe(true);
    });

    it("should handle empty categories array", () => {
      const state = questionsReducerFn(initialState, setCategories([]));

      expect(state.categories).toEqual([]);
      expect(state.isFetchedCategories).toBe(true);
    });
  });

  describe("setCurrentQuestionIndex", () => {
    it("should set the current question index", () => {
      const state = questionsReducerFn(
        initialState,
        setCurrentQuestionIndex(3)
      );

      expect(state.current_question_index).toBe(3);
    });

    it("should handle setting to 0", () => {
      const stateWithIndex = {
        ...initialState,
        current_question_index: 5,
      };

      const state = questionsReducerFn(
        stateWithIndex,
        setCurrentQuestionIndex(0)
      );

      expect(state.current_question_index).toBe(0);
    });
  });

  describe("setCurrentCategory", () => {
    it("should set the current category", () => {
      const state = questionsReducerFn(initialState, setCurrentCategory(21));

      expect(state.current_category).toBe(21);
    });
  });

  describe("setCurrentDifficulty", () => {
    it("should set the current difficulty", () => {
      const state = questionsReducerFn(
        initialState,
        setCurrentDifficulty(
          "hard" as VariablesSliceState["current_difficulty"]
        )
      );

      expect(state.current_difficulty).toBe("hard");
    });

    it("should handle different difficulty levels", () => {
      const state = questionsReducerFn(
        initialState,
        setCurrentDifficulty(
          "medium" as VariablesSliceState["current_difficulty"]
        )
      );

      expect(state.current_difficulty).toBe("medium");
    });
  });

  describe("setCurrentType", () => {
    it("should set the current question type", () => {
      const state = questionsReducerFn(
        initialState,
        setCurrentType("boolean" as VariablesSliceState["current_type"])
      );

      expect(state.current_type).toBe("boolean");
    });

    it("should handle multiple choice type", () => {
      const state = questionsReducerFn(
        initialState,
        setCurrentType("multiple" as VariablesSliceState["current_type"])
      );

      expect(state.current_type).toBe("multiple");
    });
  });

  describe("setCurrentAmount", () => {
    it("should set the current amount", () => {
      const state = questionsReducerFn(initialState, setCurrentAmount(10));

      expect(state.current_amount).toBe(10);
    });

    it("should handle different amounts", () => {
      const state = questionsReducerFn(initialState, setCurrentAmount(50));

      expect(state.current_amount).toBe(50);
    });
  });

  describe("multiple actions", () => {
    it("should handle multiple state updates", () => {
      let state = questionsReducerFn(initialState, setCurrentAmount(5));
      state = questionsReducerFn(state, setCurrentCategory(9));
      state = questionsReducerFn(
        state,
        setCurrentDifficulty(
          "easy" as VariablesSliceState["current_difficulty"]
        )
      );
      state = questionsReducerFn(
        state,
        setCurrentType("multiple" as VariablesSliceState["current_type"])
      );

      expect(state.current_amount).toBe(5);
      expect(state.current_category).toBe(9);
      expect(state.current_difficulty).toBe("easy");
      expect(state.current_type).toBe("multiple");
    });
  });
});
