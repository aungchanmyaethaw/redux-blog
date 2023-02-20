import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../users/userSlice";
const Users = () => {
  const users = useSelector(selectAllUsers);

  return (
    <div className="flex flex-col gap-4 mt-8">
      {users.map((user) => (
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      ))}
    </div>
  );
};

export default Users;
