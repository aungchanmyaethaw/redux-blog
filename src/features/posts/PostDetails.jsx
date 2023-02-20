import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, selectPostById } from "./postSlice";
import User from "./User";
import Date from "./Date";
const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [deleteStatus, setDeleteStatus] = useState("idle");
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const handleDelete = async () => {
    try {
      setDeleteStatus("deleting");
      dispatch(deletePost(postId)).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    } finally {
      setDeleteStatus("idle");
    }
  };

  return (
    <article className="p-4">
      <h1 className="text-2xl mb-4">{post?.title}</h1>
      <p className="text-lg">{post?.body}</p>
      <Date timestamp={post?.date} />
      <User userId={post?.userId} />
      <button
        className="mt-8 px-4 py-2 rounded bg-red-700 text-white"
        onClick={handleDelete}
        disabled={deleteStatus === "idel"}
      >
        Delete
      </button>
      <Link
        to={`/posts/edit/${postId}`}
        className="ml-4 mt-8 px-4 py-2 rounded bg-violet-700 text-white"
      >
        Edit
      </Link>
    </article>
  );
};

export default PostDetails;
