# React Quiz App

A simple **Quiz application** built with:

- **React + TypeScript**
- **Redux Toolkit**
- **MUI (Material UI)**

---

## Requirement / Features

### Dashboard

- Form to set quiz settings:
  - Category
  - Difficulty
  - Type
  - Amount of questions

### Questions Page

- Show list of questions (one at a time)
- Store user answers in Redux
- Countdown timer for each question
- Show score
- Automatically switch to next question after answering

### Final Score Page

- Show final score
- Form to input user information (name, etc.)

### Leaderboard

- Display a table of users and scores
- Allow exporting leaderboard as CSV

---

## Tech Stack

- **React** (v17/18/19)
- **TypeScript**
- **Redux Toolkit**
- **React Hook Form**
- **React Router v7**
- **MUI**
- **Vite** (build tool)
- **Vitest** (testing)
- **ESLint** (linting)

---

## Getting Started

### Prerequisites

Make sure you have **Node.js >= 18** and **npm** installed:

```bash
node -v
npm -v

Installation

Clone the repository:

git clone <repository-url>
cd react-quiz-app


Install dependencies:

npm install

Running the App

Start the development server:

npm run dev

Open http://localhost:5173
 in your browser.
App will auto-reload on file changes.

Scripts
Script	Description
npm run dev	Run the app in development mode with Vite
npm run build	Build production bundle (tsc -b && vite build)
npm run preview	Preview production build locally
npm run lint	Run ESLint to check code
npm run test	Run unit tests using Vitest
npm run test:ui	Run Vitest in UI mode
npm run test:run	Run tests in CLI mode
npm run test:coverage	Generate test coverage report
npm run test:coverage:ui	Generate coverage report and open in browser
Folder Structure
react-quiz-app/
├─ public/                   # Static files
├─ src/
│  ├─ assets/                # Images, icons, etc.
│  ├─ components/            # Reusable UI components
│  ├─ hooks/                 # Custom hooks (useFetchCategories)
│  ├─ pages/                 # Pages: Dashboard, Questions, FinalScore, Leaderboard
│  ├─ redux/                 # Redux slices
│  ├─ store.ts               # Redux store configuration
│  ├─ types/                 # TypeScript types
│  └─ main.tsx               # Entry point
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md

Usage

Open app in browser

Dashboard: choose quiz settings

Questions page: answer questions, timer counts down, score updates

Final Score page: see total score, submit name/info

Leaderboard page: view top scores, export CSV

Testing

Run unit tests:

npm run test


Run Vitest UI:

npm run test:ui


Generate coverage:

npm run test:coverage


Open coverage report:

npm run test:coverage:ui

Building for Production
npm run build
npm run preview


Build output is in dist/ folder.

Contributing

Fork the repo

Create a branch: git checkout -b feature/my-feature

Commit changes: git commit -m "Add my feature"

Push branch: git push origin feature/my-feature

Open a pull request
```

Summary of Setup & Test Coverage:

TESTING.md - Comprehensive testing guide (8KB)
TESTING_QUICK_START.md - Quick reference guide
📁 Key Files Created/Modified:
test-utils.tsx - Custom render function with Redux & Router
vite.config.ts - Updated to use happy-dom
All test files (\*.spec.ts/tsx)
Documentation guides
🚀 How to Use Tests:
📚 Best Practices Included:
✅ Component testing with React Testing Library
✅ Redux state testing
✅ User interaction testing with user-event
✅ Utility function testing
✅ Custom render wrapper for all tests
✅ Proper mocking of external dependencies
✅ Pre-configured jsdom/DOM environment
