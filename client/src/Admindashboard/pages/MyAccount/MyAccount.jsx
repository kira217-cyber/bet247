import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";

const MyAccount = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Account Statement", path: "/admin-dashboard/my-account/statement" },
    { name: "Account Summary", path: "/admin-dashboard/my-account/summary" },
    { name: "Account Details", path: "/admin-dashboard/my-account/account-details" },
    { name: "Profile", path: "/admin-dashboard/my-account/profile" },
    { name: "Activity Log", path: "/admin-dashboard/my-account/active-log" },
  ];

  return (
    <div className="md:flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="static translate-x-0 top-0 left-0 h-full lg:w-60 lg:ml-10 lg:mt-10 bg-white shadow-md transform transition-transform duration-300">
        <div className="p-4 font-bold bg-gray-800 text-white">Position</div>
        <ul className="divide-y">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-2 py-2 cursor-pointer ${
                    isActive ? "bg-yellow-300 font-medium" : "hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
