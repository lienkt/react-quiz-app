import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Header from "../components/Header";

const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Question = React.lazy(() => import("../pages/question"));
const FinalScore = React.lazy(() => import("../pages/final-score"));
const Leaderboard = React.lazy(() => import("../pages/leaderboard"));
import { Outlet } from "react-router";
import { Container } from "@mui/material";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="p-4">
        <Container maxWidth="md" sx={{ my: 5 }}>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export const RoutesMain = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/dashboard" /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/question", element: <Question /> },
        { path: "/final-score", element: <FinalScore /> },
        { path: "/leader-board", element: <Leaderboard /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
