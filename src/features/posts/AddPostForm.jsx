import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../users/userSlice";
import { addPost } from "../posts/postSlice";
const AddPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [formStatus, setFormStatus] = useState("idle");
  const [inputValues, setInputValues] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const handleInputChange = (key, value) => {
    if (key === "userId") {
      value = Number(value);
    }

    setInputValues((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormStatus("pending");

      const tempData = {
        ...inputValues,
        date: new Date().toISOString(),
      };

      dispatch(addPost(tempData)).unwrap();
      navigate("/");
    } catch (e) {
    } finally {
      setFormStatus("idle");
    }
  };

  const userSelectBox = users?.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  const canSaved =
    Object.entries(inputValues).every(([key, value]) => value) &&
    formStatus === "idle";

  return (
    <form className="flex flex-col items-center gap-8 mt-8">
      <fieldset className="flex gap-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={inputValues.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="border border-slate-800"
        />
      </fieldset>
      <fieldset className="flex gap-4">
        <label htmlFor="body">Body</label>
        <input
          type="text"
          id="body"
          value={inputValues.body}
          className="border border-slate-800"
          onChange={(e) => handleInputChange("body", e.target.value)}
        />
      </fieldset>
      <fieldset className="flex gap-4">
        <label htmlFor="user">User</label>

        <select
          value={inputValues.userId}
          onChange={(e) => handleInputChange("userId", e.target.value)}
          id="user"
        >
          <option value=""></option>
          {userSelectBox}
        </select>
      </fieldset>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-red-400 text-white disabled:bg-red-100"
        onClick={handleSubmit}
        disabled={!canSaved}
      >
        Add
      </button>
    </form>
  );
};

export default AddPostForm;
