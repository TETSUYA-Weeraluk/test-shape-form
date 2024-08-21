import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home/Home";
import Shape from "../pages/Shape/Shape";
import Form from "../pages/Form/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shape",
        element: <Shape />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
]);

export default router;
