import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const MobileBilling = () => {
  
  return (
    <>
      {/* Header */}
      <div className="bg-yellow-500 text-black px-4 py-3 font-bold flex items-center">
        <span className="mr-2 w-22">
          <Link to={"/"}>
            <FaArrowCircleLeft size={20} />
          </Link>
        </span>{" "}
        <span>Bitting Records</span>
      </div>
      {/* Sattled Mobile */}
      <div className="block md:hidden bg-[#1e1e1e] text-white rounded shadow-md pb-24">
        {/* Tabs */}
        <div className="flex">
          <NavLink
            className={({ isActive }) =>
              `flex-1 text-center py-2 font-semibold ${
                isActive
                  ? "bg-yellow-400 text-white"
                  : "bg-yellow-600 text-gray-200"
              }`
            }
          >
            Settled
          </NavLink>

          {/* Unsettled */}
          <Link
            to="/profile/billing-records/unsettled"
            className="flex-1 text-center py-2 font-semibold">
            Unsettled
          </Link>
        </div>

        {/* Filter & Date */}
        <div className="flex justify-between items-center bg-gray-800 p-2">
          <button className="bg-yellow-500 text-black text-sm px-3 py-1 rounded">
            Today
          </button>
          <button className="p-2 bg-gray-700 rounded">
            <FaFilter className="text-white" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-1">
            <thead className="bg-gray-900 ">
              <tr>
                <th className="p-1 text-center text-[12px] border-r">
                  Platform
                </th>
                <th className="p-1 text-center text-[12px] border-r">
                  Game Type
                </th>
                <th className="p-1 text-center text-[12px] border-r">
                  Turnover
                </th>
                <th className="p-1 text-center text-[12px]">Profit/Loss</th>
              </tr>
            </thead>
            <tbody className="mt-2">
              <tr className="bg-gray-800">
                <td className="p-1 font-semibold text-center text-[12px] border-r">
                  TOTAL
                </td>
                <td className="p-2 text-center text-[12px] border-r">-</td>
                <td className="p-2 text-center text-[12px] border-r">0.00</td>
                <td className="p-2 text-green-400 text-center text-[12px]">
                  (0.00)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MobileBilling;
