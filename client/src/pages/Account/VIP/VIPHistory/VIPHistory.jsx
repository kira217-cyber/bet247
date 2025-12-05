import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

const VIPHistory = () => {
  const {userBalance,currency} = useContext(AuthContext)
  return (
    <>
      {/* Header */}
      <div className="mt-12 lg:mt-28">
        <div className="flex items-center m-6 bg-gray-700 p-4 rounded-lg">
          <div className="w-1/2">
            <p className="text-white">Main Wallet</p>
            <p className="text-green-400 text-xl font-bold">{currency} {userBalance}</p>
          </div>
          <div className="w-1/2">
            <p className="text-white">Security Level</p>
            <p className="text-green-400 font-bold">Safe</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 text-white m-6 rounded-lg p-8">
        {/* Tabs */}
        <div className="flex justify-between gap-2 mb-6 pb-3 border-b-2 border-dashed border-yellow-500">
          <div>
            <h3 className="text-yellow-500 font-bold border-l-2 text-2xl pl-2">
              VIP
            </h3>
          </div>
          <div>
            <Link
              to={"/profile/vip"}
              className="px-12 py-2 font-bold bg-gray-500 text-white"
            >
              My VIP
            </Link>
            {/* VP Received */}
            <Link
              to={"/profile/vip/vip-received"}
              className="px-12 py-2 font-bold bg-gray-500 text-white"
            >
              VIP Received
            </Link>

            {/* VP Used */}

            <Link
              to={"/profile/vip/vip-used"}
              className="px-12 py-2 font-bold bg-gray-500 text-white"
            >
              VIP Used
            </Link>

            {/* VP History */}
            <NavLink
              to="/profile/vip/vip-history"
              className={({ isActive }) =>
                `px-12 py-2  ${
                  isActive
                    ? "bg-yellow-500 text-white font-bold"
                    : "bg-gray-500 text-white"
                }`
              }
            >
              VP History
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default VIPHistory;
