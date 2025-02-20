import { createBrowserRouter } from "react-router";
import Layouts from "../layouts/Layouts";
import TaskPage from "../pages/TaskPage/TaskPage";
import Login from "../pages/Auth/Login";
import HomePage from "../pages/Home/Home";
import HomeLayouts from "../layouts/HomeLayouts";
import LoginPage2 from "../pages/Auth/LoginPage2";
import Register from "../pages/Auth/Register";
import Register2 from "../pages/Auth/Register2";

const Router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layouts />,
    children: [
      {
        path: "/dashboard",
        element: <TaskPage />,
      },
    ],
  },
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
            element: <LoginPage2 />,
        },
        {
            path: "/auth/register",
            element: <Register2 />,
        },
    ]
  }
]);

export default Router;
