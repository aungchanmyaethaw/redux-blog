import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
const SinglePost = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  return (
    <article className="p-4 rounded border-emerald-400 border-2">
      <h2 className="text-2xl">{post.title}</h2>
      <p className="mb-8">{post.body.substring(0, 75)}...</p>
      <p>
        <Link to={`posts/${post.id}`}>View Post</Link>
      </p>
    </article>
  );
};

export default SinglePost;
