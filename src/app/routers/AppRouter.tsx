import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/app/layouts";
import { Controlled, Main, Uncontrolled } from "@/pages";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "controlled",
        element: <Controlled />,
      },
      {
        path: "uncontrolled",
        element: <Uncontrolled />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter };
