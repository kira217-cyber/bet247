import React, { useState } from "react";
import { FaArrowCircleLeft, FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";

const MobileResetPassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="bg-yellow-500 text-black px-4 py-3 font-bold flex items-center">
        <span className="mr-2 w-20 ">
          <Link to={"/"}>
            <FaArrowCircleLeft size={20} />
          </Link>
        </span>{" "}
        <span>Reset Password</span>
      </div>
      <div className="block md:hidden bg-gray-700 text-white p-4 shadow-md">
        {/* Current Password */}
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">
            Current password
          </label>
          <div className="relative bg-gray-500 rounded flex items-center">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Current password"
              className="w-full bg-transparent p-2 pr-10 text-sm focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 text-white"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">
            New password
          </label>
          <div className="relative bg-gray-500 rounded flex items-center">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New password"
              className="w-full bg-transparent p-2 pr-10 text-sm focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 text-white"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">
            Confirm new password
          </label>
          <div className="relative bg-gray-500 rounded flex items-center">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full bg-transparent p-2 pr-10 text-sm focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 text-white"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-[#3d4c6f] p-3 rounded mb-4 text-sm">
          <div className="flex items-start gap-2">
            <FaInfoCircle className="text-white mt-1" />
            <ul className="list-decimal list-inside text-white space-y-1">
              <li>Must be 8-20 characters in length</li>
              <li>must contain 1 uppercase alphabet (A-Z) at least</li>
              <li>must contain 1 lowercase alphabet (a-z) at least</li>
              <li>must contain 1 number (0-9) at least</li>
              <li>must contain 1 special character</li>
            </ul>
          </div>
        </div>

        {/* Confirm Button */}
        <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition">
          Confirm
        </button>
      </div>
    </>
  );
};

export default MobileResetPassword;
