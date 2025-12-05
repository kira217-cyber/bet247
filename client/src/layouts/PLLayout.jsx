import React from "react";
import { NavLink, Outlet } from "react-router";

const PLLayout = () => {
  return (
    <div className="bg-black text-white py-2  min-h-screen sm:block md:hidden">

      {/* Top Navbar */}
      <div className="bg-black flex justify-between gap-2 py-2">
        {[
          { name: "All", to: "/profile/real-wallet/pl/pl-all" },
          { name: "P&L", to: "/profile/real-wallet/pl/p-l" },
          { name: "Account", to: "/profile/real-wallet/pl/pl-account" },
        ].map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex-1 text-center py-3 font-semibold rounded ${
                isActive ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* Fixed Header Section */}
      <div className="flex py-2 p-1 gap-2 items-center justify-between bg-[#2e2e2e] overflow-auto">
        <p className="p-1 text-center">Date/Time</p>
        <p className="border-l-1 p-1 text-center">Plus</p>
        <p className="border-l-1 p-1 text-center">Minus</p>
        <p className="border-l-1 p-1 text-center">Balance</p>
        <p className="border-l-1 p-1 text-center">TurnOver</p>
        <p className="border-l-1 p-1 text-center">Market/Remark</p>
      </div>

      {/* Outlet for Pages */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default PLLayout;
