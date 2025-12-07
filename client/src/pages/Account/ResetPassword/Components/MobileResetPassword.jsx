import React, { useContext, useState } from "react";
import {
  FaArrowCircleLeft,
  FaEye,
  FaEyeSlash,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const MobileResetPassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(AuthContext

  );
  const API_URL = import.meta.env.VITE_API_URL;

  // পাসওয়ার্ড ভ্যালিডেশন (8-20 চরিত্র + রুল)
  const validatePassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      setLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error(
        "Password must be 8-20 chars with uppercase, lowercase, number & special char"
      );
      setLoading(false);
      return;
    }

    try {
      const res = await axios.put(
        `${API_URL}/api/change-password/user`,
        {
          userId: loginUser._id,
          currentPassword,
          newPassword,
        }
      );

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
      {/* Header */}
      <div className="bg-yellow-500 text-black px-4 py-3 font-bold flex items-center shadow-md">
        <span className="mr-3">
          <Link to="/">
            <FaArrowCircleLeft size={26} />
          </Link>
        </span>
        <span className="text-lg">Reset Password</span>
      </div>

      {/* Form */}
      <div className="block md:hidden bg-gray-700 text-white p-5 shadow-lg min-h-screen">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Current password
            </label>
            <div className="relative bg-gray-600 rounded-lg overflow-hidden">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-transparent p-3 pr-12 text-white placeholder-gray-400 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              New password
            </label>
            <div className="relative bg-gray-600 rounded-lg overflow-hidden">
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent p-3 pr-12 text-white placeholder-gray-400 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Confirm new password
            </label>
            <div className="relative bg-gray-600 rounded-lg overflow-hidden">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent p-3 pr-12 text-white placeholder-gray-400 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-[#3d4c6f] p-4 rounded-lg text-xs border border-gray-600">
            <div className="flex items-start gap-3">
              <FaInfoCircle
                className="text-yellow-300 mt-0.5 flex-shrink-0"
                size={18}
              />
              <ul className="list-disc list-inside text-gray-200 space-y-1 leading-tight">
                <li>Must be 8-20 characters in length</li>
                <li>1 uppercase (A-Z), 1 lowercase (a-z)</li>
                <li>1 number (0-9)</li>
                <li>1 special character (!@#$%^&*)</li>
              </ul>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-3.5 rounded-lg hover:bg-yellow-500 transition transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg text-lg"
          >
            {loading ? "Changing Password..." : "Confirm"}
          </button>
        </form>
      </div>
    </>
  );
};

export default MobileResetPassword;
