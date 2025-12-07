import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const DesktopResetPassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { userBalance, currency, loginUser } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  // পাসওয়ার্ড রুল চেক (6-20 চরিত্র, বড়-ছোট হাতের, নাম্বার, স্পেশাল চিহ্ন)
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%*#])[A-Za-z\d!$%*#]{6,20}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // কনফার্ম পাসওয়ার্ড ম্যাচ চেক
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      setLoading(false);
      return;
    }

    // পাসওয়ার্ড রুল চেক
    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be 6-20 chars, contain A-Z, a-z, 0-9 & (!$%*#)"
      );
      setLoading(false);
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/api/change-password/user`, {
        userId: loginUser._id,
        currentPassword,
        newPassword,
      });

      toast.success(res.data.message || "Password changed successfully!");
      // ফর্ম ক্লিয়ার
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Wallet & Security Info */}
      <div>
        <div className="flex items-center m-6 bg-gray-700 p-4 rounded-lg shadow">
          <div className="w-1/2">
            <p className="text-white text-sm">Main Wallet</p>
            <p className="text-green-400 text-xl font-bold">
              {currency} {userBalance}
            </p>
          </div>
          <div className="w-1/2">
            <p className="text-white text-sm">Security Level</p>
            <p className="text-green-400 font-bold">Safe</p>
          </div>
        </div>
      </div>

      {/* Reset Password Form */}
      <div className="hidden md:block m-6 bg-gray-700 text-white p-8 rounded-lg shadow-xl">
        <div className="border-b-2 border-dashed border-yellow-400 w-1/2 mb-6 pb-3">
          <h2 className="text-yellow-400 font-bold text-2xl">
            | Reset Password
          </h2>
        </div>

        {/* Password Rules */}
        <div className="bg-[#3d4c6f] p-4 rounded-lg mb-8 text-sm w-1/2">
          <div className="flex items-start gap-3">
            <FaInfoCircle
              className="text-yellow-300 mt-1 flex-shrink-0"
              size={18}
            />
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              <li>Must be 6-20 characters</li>
              <li>Must contain at least 1 uppercase (A-Z)</li>
              <li>Must contain at least 1 lowercase (a-z)</li>
              <li>Must contain at least 1 number (0-9)</li>
              <li>Allowed special chars: ! $ % * #</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-1/3 p-3 pr-12 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400 text-white placeholder-gray-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-262 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-1/3 p-3 pr-12 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400 text-white placeholder-gray-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-262 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-1/3 p-3 pr-12 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-yellow-400 text-white placeholder-gray-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-262 flex items-center text-gray-400 hover:text-white"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-bold px-10 py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Updating Password..." : "Confirm & Change Password"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DesktopResetPassword;
