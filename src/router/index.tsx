import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { CarDetailPage } from "@/pages/CarDetailPage";
import { CarsPage } from "@/pages/CarsPage";
import { LoginPage } from "@/pages/LoginPage";
import { useAuthStore } from "@/store/auth.store";

// ─────────────────────────────────────────────
//  Protected Route Guard
// ─────────────────────────────────────────────

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// ─────────────────────────────────────────────
//  Public Route Guard (redirect if logged in)
// ─────────────────────────────────────────────

function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/cars" replace /> : <Outlet />;
}

// ─────────────────────────────────────────────
//  Router
// ─────────────────────────────────────────────

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/cars" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "/cars",
            element: <CarsPage />,
          },
          {
            path: "/cars/:id",
            element: <CarDetailPage />,
          },
        ],
      },
    ],
  },
]);
