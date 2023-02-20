import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, getError, selectPostsIds } from "./postSlice";
import SinglePost from "./SinglePost";
const Posts = () => {
  const posts = useSelector(selectPostsIds);
  const status = useSelector(getStatus);
  const error = useSelector(getError);

  let content;

  if (status === "loading") {
    content = <h1>Loading...</h1>;
  } else if (status === "error") {
    content = <h1>{error}</h1>;
  } else if (status === "success") {
    content = posts.map((postId) => {
      return <SinglePost key={postId} postId={postId} />;
    });
  }

  return <div className="flex flex-col gap-8 my-8">{content}</div>;
};

export default Posts;
