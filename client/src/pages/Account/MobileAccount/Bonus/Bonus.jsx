import React, { useState } from "react";

const Bonus = () => {
  const [startDate, setStartDate] = useState("2025-09-07");
  const [endDate, setEndDate] = useState("2025-09-14");
  const [filter, setFilter] = useState("All");

  return (
    <div className="w-full max-w-sm mx-auto min-h-screen bg-gray-900 p-4 rounded-lg text-white">
      {/* Date Pickers */}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-sm focus:outline-none"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-sm focus:outline-none"
        />
      </div>

      {/* Filter Select */}
      <div className="mt-3 mb-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-sm focus:outline-none"
        >
          <option value="All">All</option>
          <option value="winning">Winning</option>
          <option value="turnover">Turnover</option>
        </select>
      </div>

       {/* Fixed Header Section */}
      <div className="flex gap-1 p-1 items-center bg-yellow-400 overflow-auto">
        <p className="text-black font-semibold text-nowrap p-1">Bonus Date</p>
        <p className="text-black font-semibold text-nowrap p-1">Wallet Name</p>
        <p className="text-black font-semibold text-nowrap p-1">Account</p>
        <p className="text-black font-semibold text-nowrap p-1">Condition</p>
        <p className="text-black font-semibold text-nowrap p-1">Turnover/Win</p>
        <p className="text-black font-semibold text-nowrap p-1">Status</p>
        <p className="text-black font-semibold text-nowrap p-1">Redeemed Date</p>
        <p className="text-black font-semibold text-nowrap p-1">Update time</p>
        
      </div>
        {/* টেবিল বডি এখানে পরে যুক্ত করা যাবে */}
        <div className="text-center text-gray-400 py-3 text-xs mt-10">
          No data found
        </div>
      </div>
  );
};

export default Bonus;
