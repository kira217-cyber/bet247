import React, { useContext, useState } from "react";
import { FaRedo, FaLock, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SubAdminLogin = () => {
  const [code, setCode] = useState(generateCode());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationInput, setValidationInput] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Generate random 4-digit code
  function generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Refresh code
  const handleRefresh = () => {
    setCode(generateCode());
    setValidationInput("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(validationInput) !== code) {
      alert("Validation code does not match!");
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
        if (res.ok) {
          login(data.user); // Save user to context & localStorage
          if (data.user.role === "Sub Admin") {
            navigate("/sub-admin-dashboard"); // Only Mother Admin can access
          } else {
            toast.error(
              "You do not have permission to access the admin dashboard!"
            );
            navigate("/restricted"); // Redirect other admins to a restricted page
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8 text-white">
        {/* Header Section */}
        <div className="text-center mb-6">
          <img
            src="https://i.ibb.co/3FW7ptF/logo.png"
            alt="Logo"
            className="mx-auto h-14 mb-2"
          />
          <h2 className="text-2xl font-bold text-yellow-400">Sub Admin Login</h2>
          <p className="text-sm text-gray-400 mt-1">
            Please enter your credentials to continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Validation Code */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Validation Code"
              value={validationInput}
              onChange={(e) => setValidationInput(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="flex items-center">
              <span className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md font-bold text-yellow-400 text-lg">
                {code}
              </span>
              <button
                type="button"
                onClick={handleRefresh}
                className="px-3 py-2 bg-yellow-500 rounded-r-md hover:bg-yellow-600 flex items-center justify-center"
              >
                <FaRedo size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs mt-6">
          <p>© {new Date().getFullYear()} Sub Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SubAdminLogin;
