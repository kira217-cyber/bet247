import React, { useContext, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const SubAgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(generateCode());
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const handleRefresh = () => setCode(generateCode());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.user); // Save user to context & localStorage
      if (data.user.role === "Sub Agent") {
        navigate("/sub-agent-dashboard"); // Only Mother Admin can access
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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900">
      <div className="flex flex-col md:flex-row bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl w-[90%] max-w-4xl border border-gray-700">
        
        {/* Left Side (Image Section) */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-indigo-700 to-purple-900 p-8">
          <img
            src="https://i.ibb.co/FYKQ9Vf/subagent-login.png"
            alt="Sub Agent"
            className="w-60 mb-6"
          />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Sub-Agent Panel
          </h1>
          <p className="text-gray-300 mt-2 text-center text-sm">
            Manage user deposits and reports easily.
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-black/60">
          <h2 className="text-center text-white text-2xl font-semibold mb-6">
            Sub-Agent Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Validation Code */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Validation Code"
                className="flex-1 px-4 py-2 bg-transparent border border-gray-500 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="px-4 py-2 bg-white text-black font-bold border border-gray-500">
                {code}
              </span>
              <button
                type="button"
                onClick={handleRefresh}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg flex items-center justify-center"
              >
                <FaSyncAlt className="text-white" />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-purple-700 to-indigo-600 hover:opacity-90 text-white font-semibold rounded-lg transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubAgentLogin;
