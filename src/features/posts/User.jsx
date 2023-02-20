import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../users/userSlice";
const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  return <div>{user?.name || "unknown authour"}</div>;
};

export default User;
