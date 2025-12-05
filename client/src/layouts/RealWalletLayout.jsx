import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";

const RealWalletLayout = () => {
  const {userBalance,currency} = useContext(AuthContext)
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 md:hidden">
        {/* Yellow Header */}
        <div className="bg-yellow-400 flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Link to={'/'}><FaChevronLeft /></Link>
            <span>REAL WALLET</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Balance */}
            <div className="flex items-center gap-1 text-green-600 font-bold">
              <FaCoins />
              <span>{currency} {userBalance}</span>
            </div>
            {/* Exp */}
            <div className="bg-red-600 text-white px-2 py-0.5 rounded text-sm">
              Exp - 0
            </div>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="bg-black flex justify-between gap-2 overflow-x-auto">
          {[
            { name: "Transactions", to: "/profile/real-wallet/transactions" },
            { name: "Rewards", to: "/profile/real-wallet/rewards" },
            { name: "VIP", to: "/profile/real-wallet/vips" },
            { name: "Referral", to: "/profile/real-wallet/referral" },
            { name: "P&L", to: "/profile/real-wallet/pl" },
            { name: "Bonus", to: "/profile/real-wallet/bonus" },
            { name: "Active", to: "/profile/real-wallet/active" },
            { name: "Completed", to: "/profile/real-wallet/completed" },
          ].map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex-1 text-center p-2  ${
                  isActive
                    ? "text-white font-bold border-b-4 border-yellow-400"
                    : "text-gray-400"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="mt-20 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default RealWalletLayout;