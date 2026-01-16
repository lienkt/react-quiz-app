# React Testing Library Setup & Guide

This document provides a comprehensive guide on how React Testing Library has been set up and configured in the react-quiz-app project.

## ✅ Current Setup

Your project is fully configured with:

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **jsdom** - DOM environment for tests

## 📁 Project Structure

```
src/
├── test/
│   ├── setup.ts                          # Global test setup
│   └── test-utils.tsx                    # Custom render with providers (NEW)
├── components/
│   ├── Header.tsx
│   └── Header.spec.tsx                   # Header component tests (NEW)
├── pages/
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│   │   └── dashboard.spec.tsx            # Existing tests (updated)
│   ├── question/
│   │   ├── Question.tsx
│   │   └── question.spec.tsx             # Question page tests (NEW)
│   ├── final-score/
│   │   ├── FinalScore.tsx
│   │   └── final-score.spec.tsx          # Final Score page tests (NEW)
│   └── leaderboard/
│       ├── Leaderboard.tsx
│       └── leaderboard.spec.tsx          # Leaderboard page tests (NEW)
├── redux/
│   ├── questions.slice.ts
│   ├── questions.slice.spec.ts           # Redux slice tests (NEW)
│   ├── score.slice.ts
│   └── score.slice.spec.ts               # Score slice tests (NEW)
└── utils/
    ├── formatTimer.ts
    └── formatTimer.spec.ts               # Utility tests (NEW)
```

## 🚀 Running Tests

### Run all tests in watch mode

```bash
npm run test
```

### Run tests once (CI mode)

```bash
npm run test:run
```

### Run tests with UI dashboard

```bash
npm run test:ui
```

### Generate and view coverage report

```bash
npm run test:coverage:ui
```

## 📝 Test Files Added

### 1. **Test Utilities** (`src/test/test-utils.tsx`)

Custom render function that wraps components with Redux Provider and Router:

```tsx
import { renderWithProviders } from "../test/test-utils";

it("should render component", () => {
  renderWithProviders(<Dashboard />);
  expect(screen.getByText("Quiz App")).toBeInTheDocument();
});
```

**Features:**

- Redux Provider wrapper
- React Router wrapper
- Pre-configured store
- Support for preloaded state

### 2. **Component Tests**

#### Header Component (`src/components/Header.spec.tsx`)

- Renders title and navigation buttons
- Tests navigation functionality
- Verifies AppBar structure

#### Question Page (`src/pages/question/question.spec.tsx`)

- Tests question rendering
- Validates answer options
- Verifies score updates for correct answers
- Tests navigation to final score
- Checks question index increment

#### Final Score Page (`src/pages/final-score/final-score.spec.tsx`)

- Tests score display
- Form field rendering
- Form submission with data validation
- Redux state updates
- Navigation after submission

#### Leaderboard Page (`src/pages/leaderboard/leaderboard.spec.tsx`)

- Tests leaderboard display
- Verifies table structure
- Tests CSV download button
- Tests empty state handling
- Verifies navigation

### 3. **Redux Tests**

#### Questions Slice (`src/redux/questions.slice.spec.ts`)

- Tests all category-related actions
- Tests current question index updates
- Validates difficulty and type setters
- Tests multiple state updates

#### Score Slice (`src/redux/score.slice.spec.ts`)

- Tests score setter
- Tests leaderboard updates
- Validates sorting by score (descending)
- Tests score persistence

### 4. **Utility Tests** (`src/utils/formatTimer.spec.ts`)

- Tests timer formatting
- Tests date formatting
- Validates padding and formatting edge cases

## 🧪 Writing Tests

### Basic Component Test Pattern

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test/test-utils";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render component", () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("should handle user interactions", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MyComponent />);

    const button = screen.getByRole("button", { name: /click me/i });
    await user.click(button);

    expect(screen.getByText("Clicked!")).toBeInTheDocument();
  });
});
```

### Testing Redux Components

```tsx
import { renderWithProviders } from "../test/test-utils";

const initialState = {
  questions: {
    current_category: 9,
    current_difficulty: "easy",
    // ... other properties
  },
  score: {
    score: 0,
    leaderboards: [],
  },
};

it("should display data from Redux", () => {
  renderWithProviders(<Dashboard />, { preloadedState: initialState });

  expect(screen.getByText("Expected Category")).toBeInTheDocument();
});
```

### Testing API Calls

```tsx
import { vi, type Mock } from "vitest";

global.fetch = vi.fn() as Mock;

beforeEach(() => {
  (global.fetch as Mock).mockResolvedValue({
    json: async () => ({
      trivia_categories: [{ id: 9, name: "General Knowledge" }],
    }),
  });
});

it("should fetch data", async () => {
  renderWithProviders(<Dashboard />);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });
});
```

### Testing User Interactions

```tsx
import userEvent from "@testing-library/user-event";

it("should handle form submission", async () => {
  const user = userEvent.setup();
  renderWithProviders(<MyForm />);

  const input = screen.getByLabelText(/email/i);
  await user.type(input, "test@example.com");

  const button = screen.getByRole("button", { name: /submit/i });
  await user.click(button);

  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## 📚 Common Testing Patterns

### Querying Elements

```tsx
// By role (preferred)
screen.getByRole("button", { name: /submit/i });
screen.getByRole("heading", { level: 1 });

// By label text
screen.getByLabelText(/email/i);

// By placeholder text
screen.getByPlaceholderText(/search/i);

// By text
screen.getByText(/success/i);

// By test ID (when others aren't practical)
screen.getByTestId("custom-element");
```

### Waiting for Elements

```tsx
import { waitFor } from "@testing-library/react";

// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});

// With timeout
await waitFor(
  () => {
    expect(element).toBeInTheDocument();
  },
  { timeout: 3000 }
);
```

### Mocking Functions

```tsx
import { vi } from "vitest";

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

// Assert function was called
expect(mockNavigate).toHaveBeenCalled();

// Assert with specific arguments
expect(mockNavigate).toHaveBeenCalledWith("/path");

// Assert called times
expect(mockDispatch).toHaveBeenCalledTimes(1);
```

## 🔧 Configuration Details

### Vite Config (`vite.config.ts`)

```typescript
test: {
  globals: true,                    // Use globals (describe, it, expect)
  environment: 'jsdom',             // DOM environment
  setupFiles: './src/test/setup.ts', // Global setup
  reporters: ['verbose', 'html', 'json'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html'],
    reportsDirectory: './coverage',
  },
}
```

### Global Setup (`src/test/setup.ts`)

```typescript
import "@testing-library/jest-dom"; // Custom matchers
```

## 📊 Coverage

To generate and view coverage:

```bash
npm run test:coverage:ui
```

This generates:

- Coverage report in `./coverage/index.html`
- JSON report in `./test-results/results.json`
- HTML report in `./test-results/index.html`

## ✨ Best Practices

1. **Test Behavior, Not Implementation**

   - Test what users see and do, not how it's implemented
   - Avoid testing internal state directly

2. **Use Semantic Queries**

   - Prefer `getByRole` over `getByTestId`
   - Use `getByLabelText` for form fields

3. **Test User Interactions**

   - Use `userEvent` for realistic interactions
   - Test keyboard and mouse events

4. **Mock External Dependencies**

   - Mock API calls
   - Mock navigation
   - Mock time-dependent code

5. **Keep Tests Focused**

   - One test per behavior
   - Clear, descriptive test names
   - Use descriptive error messages

6. **Avoid Test Interdependence**
   - Each test should be independent
   - Use `beforeEach` to reset state
   - Clear mocks between tests

## 🐛 Debugging Tests

### View Test UI

```bash
npm run test:ui
```

### Run Single Test File

```bash
npm run test -- Header.spec.tsx
```

### Run Tests Matching Pattern

```bash
npm run test -- --grep "should render"
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## 📖 Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [@testing-library/user-event](https://testing-library.com/user-event)

## 🎯 Next Steps

1. **Increase Test Coverage**

   - Add tests for edge cases
   - Test error scenarios
   - Test loading states

2. **Integration Tests**

   - Test complete user flows
   - Test API integration
   - Test Redux integration

3. **E2E Tests** (Consider Cypress or Playwright)

   - Full user journeys
   - Multiple page flows
   - Real browser testing

4. **Performance Tests**
   - Monitor render performance
   - Track bundle size
   - Test with large datasets

## ❓ Troubleshooting

### Tests timeout

- Increase timeout: `{ timeout: 5000 }`
- Check for infinite loops
- Verify mocks are working

### Element not found

- Use `screen.debug()` to see DOM
- Check for async loading
- Verify element is in the DOM

### Mock not working

- Ensure mock is declared before import
- Check mock implementation
- Clear mocks in `beforeEach`

---

**Happy Testing! 🚀**
