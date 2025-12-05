import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { FaCrown, FaRupeeSign } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

const MYVIP = () => {
  const [vp, setVp] = useState("");
  const conversionRatio = 100;
  const realMoney = vp ? (vp / conversionRatio).toFixed(2) : 0;
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
            <NavLink
              className={({ isActive }) =>
                `px-12 py-2 font-bold ${
                  isActive
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-500 text-white"
                }`
              }
            >
              My VIP
            </NavLink>

            {/* VP Received */}
            <NavLink
              to="/profile/vip/vip-received"
              className={({ isActive }) =>
                `px-12 py-2 font-bold ${
                  isActive
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-500 text-white"
                }`
              }
            >
              VP Received
            </NavLink>
            {/* VP Used */}
         
            <NavLink
              to="/profile/vip/vip-used"
              className={({ isActive }) =>
                `px-12 py-2 font-bold ${
                  isActive
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-500 text-white"
                }`
              }
            >
              VP Received
            </NavLink>
            {/* VP History */}
            <NavLink
              to="/profile/vip/vip-history"
              className={({ isActive }) =>
                `px-12 py-2 font-bold ${
                  isActive
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-500 text-white"
                }`
              }
            >
              VP Received
            </NavLink>
          </div>
        </div>

        {/* VIP Card */}
        <div className="mt-6  flex justify-start items-center gap-4 ">
          {/* Left */}
          <div className="flex items-center gap-3 w-3/4 bg-gray-600 p-6 rounded">
            <FaCrown className="text-4xl text-gray-300" />
            <div>
              <p className="text-sm text-gray-400">VIP LEVEL</p>
              <p className="font-bold text-lg">SILVER</p>
            </div>
          </div>
          {/* Right */}
          <div className="text-center w-1/4 bg-gray-600 p-3 rounded">
            <p className="text-3xl font-bold">0.00</p>
            <button className="bg-red-600 px-4 py-1 rounded text-sm mt-2">
              View VIP Details
            </button>
          </div>
        </div>

        {/* Convert VP */}
        <div className="bg-gray-600 mt-6 p-6 rounded ">
          <h3 className="font-bold mb-4">Convert VP</h3>

          {/* Inputs */}
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">VP</label>
              <input
                type="number"
                value={vp}
                onChange={(e) => setVp(e.target.value)}
                className="w-full bg-gray-700 px-3 py-2 rounded text-white focus:outline-none"
                placeholder="Enter VP"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">
                Real Money
              </label>
              <div className="flex items-center bg-gray-700 px-3 py-2 rounded">
                <FaRupeeSign className="mr-1" />
                <span>{realMoney}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-white mt-1">
            VP Conversion Ratio: {conversionRatio}
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Minimum VP Required: <span className="font-semibold">4000</span>
          </p>

          {/* Button */}
          <button
            disabled={vp < 4000}
            className={`mt-4 w-1/4 py-2 rounded font-semibold ${
              vp >= 4000
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "bg-gray-900 text-gray-400 cursor-not-allowed"
            }`}
          >
            Convert to Real Money
          </button>
        </div>
      </div>
    </>
  );
};

export default MYVIP;
