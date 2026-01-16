# React Testing Library - Quick Start Guide

## 🎯 Test Coverage Overview

### ✅ Already Tested

- ✅ Header component navigation
- ✅ Dashboard form and category fetching
- ✅ Question page with timer and scoring
- ✅ Final Score page with form submission
- ✅ Leaderboard display and CSV export
- ✅ Redux slices (questions & score)
- ✅ Utility functions (timer formatting)

### Run Individual Tests

```bash
# Watch specific test file
npm run test -- Header.spec.tsx

# Run Redux tests only
npm run test -- redux

# Run component tests only
npm run test -- components

# Run a specific describe block
npm run test -- --grep "Dashboard Component"
```

## 📋 Test Commands Reference

| Command                    | Purpose                  |
| -------------------------- | ------------------------ |
| `npm run test`             | Run tests in watch mode  |
| `npm run test:ui`          | Open interactive test UI |
| `npm run test:run`         | Run tests once (CI mode) |
| `npm run test:coverage`    | Generate coverage report |
| `npm run test:coverage:ui` | Open coverage in browser |

## 🧪 Quick Test Examples

### Example 1: Testing a Simple Component

```tsx
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test/test-utils";
import MyButton from "./MyButton";

describe("MyButton", () => {
  it("should render button text", () => {
    renderWithProviders(<MyButton label="Click me" />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });
});
```

### Example 2: Testing User Interactions

```tsx
import userEvent from "@testing-library/user-event";

it("should call onClick when clicked", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  renderWithProviders(<MyButton onClick={handleClick} />);

  await user.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalled();
});
```

### Example 3: Testing with Redux State

```tsx
it("should display Redux data", () => {
  const state = {
    questions: { categories: [{ id: 9, name: "Science" }] },
    score: { score: 10, leaderboards: [] },
  };

  renderWithProviders(<MyComponent />, { preloadedState: state });
  expect(screen.getByText("Science")).toBeInTheDocument();
});
```

### Example 4: Testing Async Operations

```tsx
import { waitFor } from "@testing-library/react";

it("should load data", async () => {
  renderWithProviders(<DataComponent />);

  await waitFor(() => {
    expect(screen.getByText("Loaded Data")).toBeInTheDocument();
  });
});
```

## 📁 File Structure for New Tests

When adding new tests, place them alongside the component:

```
src/
├── components/
│   ├── MyComponent.tsx
│   └── MyComponent.spec.tsx      ← New test here
├── pages/
│   ├── MyPage.tsx
│   └── MyPage.spec.tsx           ← New test here
└── hooks/
    ├── useMyHook.ts
    └── useMyHook.spec.ts         ← New test here
```

## 🔍 Common Queries Cheatsheet

```tsx
// By Role (PREFERRED)
screen.getByRole("button", { name: /submit/i });

// By Label
screen.getByLabelText(/email/i);

// By Placeholder
screen.getByPlaceholderText(/search/i);

// By Text
screen.getByText(/welcome/i);

// By Display Value
screen.getByDisplayValue("John");

// By Test ID
screen.getByTestId("custom-id");
```

## 🎭 User Interactions

```tsx
const user = userEvent.setup();

// Type text
await user.type(input, "hello");

// Click button
await user.click(button);

// Select option
await user.selectOptions(select, "option1");

// Clear input
await user.clear(input);

// Tab between elements
await user.tab();
```

## ⚙️ Useful Assertions

```tsx
import "@testing-library/jest-dom";

// Visibility
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toHaveClass("active");

// Text & Value
expect(element).toHaveTextContent("Hello");
expect(input).toHaveValue("John");

// State
expect(button).toBeDisabled();
expect(checkbox).toBeChecked();

// Style
expect(element).toHaveStyle("color: red");
expect(element).toHaveAttribute("href", "/path");
```

## 🐛 Quick Debugging

```tsx
// Print the entire DOM
screen.debug()

// Print specific element
screen.debug(element)

// Find all matching elements
screen.getAllBy...()

// Query without error if not found
screen.queryBy...()
```

## 🚀 CI/CD Integration

For GitHub Actions or other CI:

```bash
npm run test:run
```

This runs tests once and exits with proper exit codes.

## ✅ Checklist for New Features

When adding a new feature:

- [ ] Create component test file
- [ ] Test rendering
- [ ] Test user interactions
- [ ] Test error states
- [ ] Test loading states
- [ ] Add to Redux slices if needed
- [ ] Run `npm run test:coverage` to check coverage

## 📚 Documentation

For detailed information, see [TESTING.md](./TESTING.md)

## 💡 Pro Tips

1. **Use `screen` for all queries** - More readable and accessible
2. **Avoid `waitFor` for visibility** - Use `findBy` instead
3. **Mock external APIs** - Keep tests fast and predictable
4. **Test behavior, not implementation** - Focus on what users see
5. **Use `beforeEach` to reset** - Avoid test interdependence

---

**Ready to write tests? Start with `npm run test:ui` to see the test dashboard! 🎉**
