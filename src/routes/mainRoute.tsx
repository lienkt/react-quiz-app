import React from "react";
import { createBrowserRouter, Navigate } from "react-router";

const Dashboard = React.lazy(() => import('../pages/dashboard'));
const Question = React.lazy(() => import('../pages/question'));
const FinalScore = React.lazy(() => import('../pages/final-score'));
const Leaderboard = React.lazy(() => import('../pages/leaderboard'));

export const mainRoute = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/question', element: <Question /> },
      { path: '/final-score', element: <FinalScore /> },
      { path: '/leaderboard', element: <Leaderboard /> },
    ]
  }
])