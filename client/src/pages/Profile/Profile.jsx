// Profile.jsx

import React from "react";
import Sidebar from "../../components/shared/Sidebar/Sidebar";
import { Outlet } from "react-router";


const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 md:mt-5">
        <Outlet />

      </div>
    </div>
  );
};

export default Profile;
