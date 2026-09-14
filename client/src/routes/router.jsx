import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/AppLayout";
import Register from "../pages/Register";
import Employee from "../pages/Employee";
import CreateEmployee from "../pages/CreateEmployee";
import UpdateEmployee from "../pages/EditEmployee";
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import UpdateService from "../pages/EditService";
import CreateService from "../pages/createService";
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
            element: <Dashboard/>,
          },
          {
            path: "/employee",
            element: <Employee/>,
          },
          {
            path: "/employee/create",
            element: <CreateEmployee/>,
          },
          {
            path: "/employee/edit/:id",
            element: <UpdateEmployee/>,
          },
          {
            path: "/services",
            element: <Services /> ,
          },
          {
            path:"/service/create",
            element: <CreateService/>
          },
          {
            path: "/service/edit/:id",
            element: <UpdateService/>
          }
        ],
      },
    ],
  },
]);

export default router;
