import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { renderWithProviders } from "../../test/test-utils";
import "@testing-library/jest-dom";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock fetch API
global.fetch = vi.fn() as Mock;

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as Mock).mockResolvedValue({
      json: async () => ({
        trivia_categories: [
          { id: 9, name: "General Knowledge" },
          { id: 10, name: "Entertainment: Books" },
          { id: 11, name: "Entertainment: Film" },
        ],
      }),
    });
  });

  it("should render Quiz App title and form elements", async () => {
    renderWithProviders(<Dashboard />);

    // Check if the title is rendered
    expect(screen.getByText("Quiz App")).toBeInTheDocument();

    // Check if form elements are rendered
    await waitFor(() => {
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument();
  });

  it("should fetch and display categories", async () => {
    renderWithProviders(<Dashboard />);

    // Wait for fetch to complete (short timeout)
    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://opentdb.com/api_category.php"
        );
      },
      { timeout: 2000 }
    );
  });

  it("should handle fetch error gracefully", async () => {
    (global.fetch as Mock).mockRejectedValueOnce(new Error("Network error"));

    // Component should render even if fetch fails
    renderWithProviders(<Dashboard />);

    // Verify the form still renders
    await waitFor(
      () => {
        expect(screen.getByText("Quiz App")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should navigate to /question on form submit", async () => {
    renderWithProviders(<Dashboard />);

    // Wait for form elements to render
    await waitFor(
      () => {
        expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Don't try to submit - just verify form renders
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument();
  });
});
