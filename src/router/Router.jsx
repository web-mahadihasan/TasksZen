import { createBrowserRouter } from "react-router";
import Layouts from "../layouts/Layouts";
import TaskPage from "../pages/TaskPage/TaskPage";
import HomePage from "../pages/Home/Home";
import HomeLayouts from "../layouts/HomeLayouts";
import LoginPage from "../pages/Auth/LoginPage";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/ProfilePage/ProfilePage";
import ActivityPage from "../pages/ActivityPage/ActivityPage";
import MainTaskPage from "../pages/TaskPage/MainTaskPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts/>,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/auth/login",
            element: <LoginPage />,
        },
        {
            path: "/auth/register",
            element: <Register />,
        },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Layouts /></PrivateRoute>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRoute><MainTaskPage /></PrivateRoute>,
      },
      {
        path: "/dashboard/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: "/dashboard/activity",
        element: <PrivateRoute><ActivityPage /></PrivateRoute>,
      },
    ],
  },
]);

export default Router;
