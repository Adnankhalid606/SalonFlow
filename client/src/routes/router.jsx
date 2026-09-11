import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Temporary from "../pages/temporary";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/AppLayout";
import Register from "../pages/Register";
import Employee from "../pages/Employee";
import CreateEmployee from "../pages/CreateEmployee";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Temporary />,
          },
          {
            path: "/employee",
            element: <Employee/>,
          },
          {
            path: "/employee/create",
            element: <CreateEmployee/>,
          },
        ],
      },
    ],
  },
]);

export default router;
