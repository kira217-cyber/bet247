import React, { useContext } from "react";
import { FaBell, FaWallet } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

const DesktopInbox = () => {
  const {userBalance,currency} = useContext(AuthContext)
  return (
    <>
      {/* Header */}
      <div>
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
      {/* Inbox Message */}
      <div className="hidden md:block bg-gray-700 text-white flex items-center justify-center m-6 rounded-lg">
        <div className="w-full border border-gray-600 rounded-md shadow-lg">
          {/* Header */}
          <div className="border-b border-dashed border-yellow-600 p-3">
            <h2 className="text-yellow-500 font-bold text-lg">| Inbox</h2>
          </div>

          {/* Notification Button */}
          <div className="flex items-center justify-between px-4 py-3">
            <button className="flex items-center gap-2 bg-[#0284c7] px-4 py-2 rounded-sm text-sm font-medium">
              <FaBell /> Notification
              <span className="ml-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-full">
                0
              </span>
            </button>

            <div className="text-sm text-gray-300">
              Showing 1 to 1 of 2 entries
            </div>
          </div>

          {/* Records per page */}
          <div className="px-4 text-sm text-yellow-400">
            <span className="border border-yellow-600 px-2 py-[2px] rounded-sm">
              10
            </span>{" "}
            records per page
          </div>

          {/* Table */}
          <div className="mt-3 mx-3 border border-blue-500">
            <div className="grid grid-cols-3 bg-[#0284c7] text-white text-sm font-semibold">
              <div className="px-3 py-2">Subject</div>
              <div className="px-3 py-2">Content</div>
              <div className="px-3 py-2">Received Date GMT+6</div>
            </div>

            {/* No Data Section */}
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <FaWallet className="text-5xl mb-2" />
              <p>No Data</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-4 py-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-sm text-sm font-medium">
              Edit
            </button>

            {/* Pagination */}
            <div className="flex items-center gap-3">
              <button className="text-gray-400">&larr;</button>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-sm">
                1
              </span>
              <button className="text-gray-400">2</button>
              <button className="text-gray-400">&rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopInbox;
