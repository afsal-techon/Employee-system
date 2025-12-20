import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectRouter from "./ProtectRouter";
import App from "../App";

// Lazy pages
const AdminLayout = lazy(() => import("../components/layout/AdminLayout"));
const Dashboard = lazy(() => import("../pages/User/Dashboard"));
const BranchPage = lazy(() => import("../pages/User/BranchPage"));
const Login = lazy(() => import("../pages/User/Login"));
const Register = lazy(() => import("../pages/User/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectRouter />,
    children: [
      {
        element: <App />,
        children: [
          {
            element: <AdminLayout />,   // ❌ no Suspense here
            children: [
              { index: true, element: <Dashboard /> },
              { path: "branch", element: <BranchPage /> },
            ],
          },
          {
            path: "about",
            element: <h1>About</h1>,
          },
        ],
      },
    ],
  },

  {
    path: "/register",
    element: (
      <Suspense fallback={<div className="loader"></div>}>
        <Register />
      </Suspense>
    ),
  },

  {
    path: "/login",
    element: (
      <Suspense fallback={<div className="loader"></div>}>
        <Login />
      </Suspense>
    ),
  },
]);

export default router;
