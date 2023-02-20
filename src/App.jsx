import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./features/posts/Posts";
import Layout from "./components/Layout";
import AddPostForm from "./features/posts/AddPostForm";
import PostDetails from "./features/posts/PostDetails";
import EditPostForm from "./features/posts/EditPostForm";
import Users from "./features/posts/Users";
import SingleUser from "./features/posts/SingleUser";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <AddPostForm />,
          },
          {
            path: ":postId",
            element: <PostDetails />,
          },
          {
            path: "edit/:postId",
            element: <EditPostForm />,
          },
        ],
      },
      {
        path: "users",

        children: [
          {
            index: true,
            element: <Users />,
          },
          {
            path: ":userId",
            element: <SingleUser />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
