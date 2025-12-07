import React from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext"; // তোমার AuthContext এর পাথ

const MyAccount = () => {
  const { user } = useContext(AuthContext);

  // Role অনুযায়ী বেস পাথ নির্ধারণ
  const dashboardBaseByRole = {
    "Mother Admin": "/admin-dashboard",
    "Sub Admin": "/sub-admin-dashboard",
    Master: "/master-dashboard",
    Agent: "/agent-dashboard",
    "Sub Agent": "/sub-agent-dashboard",
  };

  const basePath = dashboardBaseByRole[user?.role] || "/admin-dashboard"; // fallback

  // ডাইনামিক মেনু আইটেম (রোল অনুযায়ী পাথ চেঞ্জ হবে)
  const menuItems = [
    {
      name: "Account Statement",
      path: `${basePath}/my-account/statement`,
    },
    {
      name: "Account Summary",
      path: `${basePath}/my-account/summary`,
    },
    {
      name: "Account Details",
      path: `${basePath}/my-account/account-details`,
    },
    {
      name: "Profile",
      path: `${basePath}/my-account/profile`,
    },
    {
      name: "Activity Log",
      path: `${basePath}/my-account/active-log`,
    },
  ];

  return (
    <div className="md:flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="static translate-x-0 top-0 left-0 h-full lg:w-60 lg:ml-10 lg:mt-10 bg-white shadow-md transform transition-transform duration-300">
        <div className="p-4 font-bold bg-gray-800 text-white">My Account</div>
        <ul className="divide-y">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-3 cursor-pointer transition-colors ${
                    isActive
                      ? "bg-yellow-300 font-medium text-black"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
                end // এটা দিলে /my-account/profile এ থাকলে শুধু Profile active হবে
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
