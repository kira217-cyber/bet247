import React from "react";
import { FaRegClipboard } from "react-icons/fa";
import { FaCalendarAlt, FaFilter } from "react-icons/fa";

const Transactions = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center">
      {/* Time Tabs */}
      <div className="w-full bg-black text-white p-2 flex flex-col gap-2 block md:hidden">
        <div className="grid grid-cols-2 gap-2">
          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-yellow-500 text-sm mb-1">Start Date</label>
            <div className="flex items-center  border border-gray-600 rounded px-2">
              <FaCalendarAlt className="text-yellow-500 mr-2" />
              <input
                type="date"
                className="w-full text-white text-sm focus:outline-none"
                defaultValue="2025-09-07"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-yellow-500 text-sm mb-1">End Date</label>
            <div className="flex items-center bg-black border border-gray-600 rounded px-2">
              <FaCalendarAlt className="text-yellow-500 mr-2" />
              <input
                type="date"
                className="w-full bg-black text-white text-sm focus:outline-none"
                defaultValue="2025-09-14"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Status */}
          <div className="flex flex-col">
            <label className="text-yellow-500 text-sm mb-1">Status</label>
            <div className="flex items-center bg-black border border-gray-600 rounded px-2">
              <FaFilter className="text-yellow-500 mr-2" />
              <select className="w-full bg-black text-white text-sm focus:outline-none">
                <option value="all">All</option>
                <option value="approve">Approve</option>
                <option value="rejected">Rejected</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Payment Type */}
          <div className="flex flex-col">
            <label className="text-yellow-500 text-sm mb-1">Payment Type</label>
            <div className="flex items-center bg-black border border-gray-600 rounded px-2">
              <FaFilter className="text-yellow-500 mr-2" />
              <select className="w-full bg-black text-white text-sm focus:outline-none">
                <option value="all">All</option>
                <option value="withdraw">Withdraw</option>
                <option value="deposit">Deposit</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Header Tabs */}
      <div className="w-full bg-[#1a1a1a] flex text-sm font-medium text-gray-200 border-b border-gray-400">
        <div className="flex-1 text-center py-3 border-r border-dotted border-gray-600">
          Type
        </div>
        <div className="flex-1 text-center py-3 border-r border-dotted border-gray-600">
          Amount
        </div>
        <div className="flex-1 text-center py-3 border-r border-dotted border-gray-600">
          Status
        </div>
        <div className="flex-1 text-center py-3">Txn Date</div>
      </div>

      {/* No Data Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <FaRegClipboard className="text-6xl text-gray-400 mb-2" />
        <p className="text-gray-400">No Data</p>
      </div>
    </div>
  );
};

export default Transactions;
