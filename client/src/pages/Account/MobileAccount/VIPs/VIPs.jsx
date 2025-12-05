import React, { useState } from "react";
import { FaHistory, FaRupeeSign } from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import { MdOutlineCheckCircle } from "react-icons/md";

const VIP = () => {
  const [vp, setVp] = useState("");
  const conversionRate = 0.01; // 1 VP = 0.01 money
  const realMoney = vp ? (parseFloat(vp) * conversionRate).toFixed(2) : "0";

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-xl p-4 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <RiVipCrownFill className="text-4xl text-gray-200" />
          <div>
            <p className="text-xs text-gray-200">VIP LEVEL</p>
            <h2 className="text-lg font-bold">SILVER</h2>
          </div>
        </div>
        <button className="flex items-center space-x-1 text-yellow-300 text-sm">
          <FaHistory /> <span>History</span>
        </button>
      </div>

      <div className="mt-2 text-right text-xs text-gray-400">
        <button className="hover:text-yellow-300">View VIP System</button>
      </div>

      {/* Total VP */}
      <div className="mt-4">
        <p className="text-sm text-gray-300">Total VP</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-3xl font-bold">0.00</span>
          <span className="text-gray-400 text-sm">VP</span>
        </div>
        <div className="mt-1 text-xs text-yellow-400 cursor-pointer">
          ► Convert VP
        </div>
      </div>

      {/* Check Status */}
      <div className="flex justify-end mt-2">
        <button className="flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded-md text-xs">
          <MdOutlineCheckCircle />
          <span>Check Status</span>
        </button>
      </div>

      {/* Conversion Box */}
      <div className="bg-blue-800 mt-4 rounded-lg p-4">
        {/* VP Input */}
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-semibold">VP</span>
          <span className="text-gray-200">Minimum VP Required: 4000</span>
        </div>
        <input
          type="number"
          value={vp}
          onChange={(e) => setVp(e.target.value)}
          placeholder="Enter VP"
          className="w-full p-2 rounded bg-gray-900 text-white text-sm focus:outline-none"
        />

        <p className="text-xs mt-2 text-gray-300">
          VP Conversion Ratio : <span className="font-bold">100</span>
        </p>

        {/* Real Money */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-1">
            <FaRupeeSign className="text-yellow-400" />
            <span className="text-sm font-semibold">Real Money</span>
          </div>
          
        </div>
        <div className="bg-gray-900 rounded px-3 py-2 text-sm mt-2">
            {realMoney}
          </div>
      </div>

      {/* Convert Button */}
      <button className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-2 rounded-lg font-semibold">
        Convert to Real Money
      </button>
    </div>
  );
};

export default VIP;
