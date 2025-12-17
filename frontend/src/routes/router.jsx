import { createBrowserRouter } from "react-router-dom";
import ProtectRouter from "./ProtectRouter";
import App from "../App";
import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/User/Login";
import Profile from "../pages/User/Profile";
import Register from "../pages/User/Register";
import Dashboard from "../pages/User/Dashboard";
import BranchPage from "../pages/User/BranchPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectRouter />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <AdminLayout />,
            children: [
              {
                path: "/",
                element:<Dashboard/>
              },
              {
                path:'/branch',
                element:<BranchPage/>
              }
            ],
          },
          {
            path:'/about',
            element: <h1>About</h1>
          }
        ],
      },
    ],
  },

   {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
