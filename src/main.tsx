import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./pages/error-page.jsx";
import { TransactionDetails } from "./components/transactions/details.tsx";
import TransactionPages from "./pages/transactions-page.tsx";
import { DashboardLayout } from "./components/layouts/dashboard-layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        path: "/dashboard/transactions",
        element: <TransactionPages />,
        children: [
          {
            path: "/dashboard/transactions/:trxnId",
            element: <TransactionDetails />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
