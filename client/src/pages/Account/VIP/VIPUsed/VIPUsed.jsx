import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

const VIPUsed = () => {
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
      {/* Tabs */}
      <div className="bg-gray-700 text-white m-6 rounded-lg p-8">
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
            <NavLink
              to="/profile/vip/vip-used"
              className={({ isActive }) =>
                `px-12 py-2  ${
                  isActive
                    ? "bg-yellow-500 text-white font-bold"
                    : "bg-gray-500 text-white"
                }`
              }
            >
              VP Used
            </NavLink>

            {/* VP History */}
            <Link
              to={"/profile/vip/vip-history"}
              className="px-12 py-2 font-bold bg-gray-500 text-white"
            >
              VIP History
            </Link>
          </div>
        </div>
        {/* records */}
        <div className="bg-gray-600 text-white p-6 rounded-lg">
                {/* Top Controls */}
                <div className="flex justify-between items-center mb-3">
                  {/* Records per page */}
                  <div className="flex items-center gap-2">
                    <select className="bg-yellow-500 text-black font-semibold px-2 py-1 rounded">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <span className="text-sm">records per page</span>
                  </div>
      
                  {/* Showing entries */}
                  <div className="text-sm text-gray-300">
                    Showing <span className="font-semibold">1 to 9</span> of{" "}
                    <span className="font-semibold">9</span> entries
                  </div>
                </div>
      
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#0284c7] text-white text-sm">
                        <th className="px-4 py-2 text-left border-r">No</th>
                        <th className="px-4 py-2 text-left border-r">VIP Points (VP)</th>
                        <th className="px-4 py-2 text-left border-r">Amount</th>
                        <th className="px-4 py-2 text-left">
                          Time{" "}
                          <span className="bg-gray-200 text-black px-1 py-0.5 rounded text-xs">
                            GMT+5.5
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* এখানে যদি ডাটা থাকে তাহলে ম্যাপ করবেন */}
                      <tr>
                        <td colSpan="4" className="text-center text-gray-400 py-4">
                          No data available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
      
                {/* Pagination */}
                <div className="flex justify-end items-center mt-4 gap-2">
                  <button className=" text-white px-3 py-1 rounded disabled:opacity-50">
                    <FaChevronLeft />
                  </button>
                  <button className="bg-[#0284c7] text-white px-3 py-1 rounded">
                    1
                  </button>
                  <button className=" text-white px-3 py-1 rounded disabled:opacity-50">
                    <FaChevronRight />
                  </button>
                </div>
              </div>
      </div>
      
    </>
  );
};

export default VIPUsed;
