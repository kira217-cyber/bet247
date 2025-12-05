import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../../../context/AuthContext";

const DesktopResetPassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {userBalance,currency} = useContext(AuthContext)

  return (
    <>
      {/* Header */}
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
      <div className="hidden md:block m-6 bg-gray-700 text-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-dashed border-yellow-400 w-1/2 mb-4 pb-2">
          <h2 className="text-yellow-400 font-bold text-xl"> <span>|</span> Reset password</h2>
        </div>

        {/* Password Requirements */}
        <div className="bg-[#3d4c6f] p-3 rounded mb-6 text-sm w-1/2">
          <div className="flex items-start gap-2">
            <FaInfoCircle className="text-white mt-1" />
            <ul className="list-decimal list-inside text-white space-y-1">
              <li>must be 6-20 characters</li>
              <li>must contain 1 uppercase alphabet (A-Z) at least</li>
              <li>must contain 1 lowercase alphabet (a-z) at least</li>
              <li>must contain 1 number (0-9) at least</li>
              <li>allow special characters (!$%*#)</li>
            </ul>
          </div>
        </div>

        {/* Current Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Current password</label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Current password"
              className="w-1/3 p-2 pr-10 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="button"
              className="absolute left-122 top-3 text-gray-400"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <FaEye color="white" size={20} /> : <FaEyeSlash color="white" size={20} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">New password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New password"
              className="w-1/3 p-2 pr-10 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="button"
              className="absolute left-122 top-3 text-gray-400"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEye color="white" size={20} /> : <FaEyeSlash color="white" size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="mb-6">
          <label className="block mb-1 text-sm">Confirm new password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-1/3 p-2 pr-10 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400"
            />
            <button
              type="button"
              className="absolute left-122 top-3 text-gray-400"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEye color="white" size={20} /> : <FaEyeSlash color="white" size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="bg-yellow-400 text-white font-semibold px-6 py-2 rounded hover:bg-yellow-500 transition hover:cursor-pointer">
          Confirm
        </button>
      </div>
    </>
  );
};

export default DesktopResetPassword;
