import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="justify-between flex py-8 bg-slate-500 px-4">
      <Link to="/" className="text-2xl text-white">
        Blogs
      </Link>
      <ul className="flex gap-8">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
