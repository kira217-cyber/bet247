import React, { useContext, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginImage, mobileMenu, loginUserData } = useContext(AuthContext);
  const { loginBtnColor, btnFontSize, buttonFontColor, loginPageBgColor } =
    mobileMenu;

  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login-user`,
        {
          username: form.username.trim(),
          password: form.password,
        }
      );

      toast.success("Login Successful!");

      // Save to AuthContext & localStorage
      loginUserData(res.data.user);

      navigate("/");
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md shadow-lg rounded overflow-hidden">
        {loginImage && (
          <img src={loginImage} alt="Login Banner" className="w-full" />
        )}

        <form
          onSubmit={handleLogin}
          style={{ backgroundColor: loginPageBgColor }}
          className="px-6 py-6 space-y-4"
        >
          <h2 className="text-center text-2xl font-bold text-white mb-4">
            Login
          </h2>

          {/* Username */}
          <div>
            <label className="block text-white mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="4-15 char, allow number"
              className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-white mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="8-20 char"
              className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Validation Code */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Validation Code"
              required
              className="flex-1 px-4 py-2 rounded bg-white text-black focus:outline-none"
            />
            <span className="bg-white px-3 py-2 rounded text-black font-bold">
              {Math.floor(1000 + Math.random() * 9000)}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              backgroundColor: loginBtnColor,
              color: buttonFontColor,
              fontSize: `${btnFontSize}px`,
            }}
            className="w-full py-2 font-semibold rounded mt-2 hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
