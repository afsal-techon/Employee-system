import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
