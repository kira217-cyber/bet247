import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const ParleyRecords = () => {
  return (
    <>
      <div className="mt-12">
        {/* Header */}
      <div className="bg-yellow-500 text-black px-4 py-3 font-bold flex items-center">
        <span className="mr-2 w-26">
          <Link to={"/"}>
            <FaArrowCircleLeft size={20} />
          </Link>
        </span>{" "}
        <span>Parley Records</span>
      </div>
      {/* Sattled Mobile */}
      <div className="block md:hidden bg-[#1e1e1e] text-white rounded shadow-md pb-24">
        

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
      </div>
    </>
  );
};

export default ParleyRecords;
