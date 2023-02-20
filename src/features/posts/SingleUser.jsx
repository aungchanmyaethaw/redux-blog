import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostsByUser } from "./postSlice";
const SingleUser = () => {
  const { userId } = useParams();
  const posts = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );
  console.log(posts);
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      ))}
    </div>
  );
};

export default SingleUser;
