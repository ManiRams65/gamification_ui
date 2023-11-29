import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Dashboard from "./src/components/Dashboard";
import Activity from "./src/components/Activity";
import EmployeeSinglePoints from "./src/components/EmployeeSinglePoints";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/Activity",
        element: <Activity />,
      },
      {
        path: "/employee-point/:id",
        element: <EmployeeSinglePoints />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRoute} />);
