import React from "react";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { questionsReducer } from "../redux/questions.slice";
import { scoreReducer } from "../redux/score.slice";
import type { RootState } from "../store";

// Create a custom render function that includes Redux Provider and Router
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        questions: questionsReducer as any,
        score: scoreReducer as any,
      },
      preloadedState: preloadedState as Partial<RootState>,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }), store };
}

// Re-export everything from React Testing Library
export { render };
export type * from "@testing-library/react";
export { screen, waitFor, fireEvent } from "@testing-library/react";
