import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import FinalScore from "./FinalScore";
import { renderWithProviders } from "../../test/test-utils";

// Mock useNavigate - must be outside describe block
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("FinalScore Component", () => {
  const initialState = {
    questions: {
      categories: [],
      isFetchedCategories: false,
      current_category: 0,
      current_difficulty: "easy" as const,
      current_type: "multiple" as const,
      current_amount: 5,
      current_question_index: 0,
    },
    score: {
      score: 8,
      leaderboards: [],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the final score", () => {
    renderWithProviders(<FinalScore />, { preloadedState: initialState });

    expect(screen.getByText(/Final Score: 8/)).toBeInTheDocument();
  });

  it("should render the form with required fields", () => {
    renderWithProviders(<FinalScore />, { preloadedState: initialState });

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("should render submit button", () => {
    renderWithProviders(<FinalScore />, { preloadedState: initialState });

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
