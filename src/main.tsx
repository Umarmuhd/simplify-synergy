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
import client from "./data/client/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProvider from "./components/providers/modal.tsx";
import { Toaster } from "sonner";

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
        loader: async () => {
          const result = await client.transactions.paginated({});
          return result;
        },
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* // Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <ModalProvider />
      <Toaster richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
