import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <main className="max-w-[1200px] mx-auto ">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
