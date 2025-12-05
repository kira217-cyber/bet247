import React, { useContext, useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner11 } from "react-icons/im";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { signupImage, mobileMenu,loginUserData } = useContext(AuthContext);
  const { signupBtnColor, btnFontSize, buttonFontColor, pageBgColor, pageFontSize } =
    mobileMenu;

  const navigate = useNavigate();

  // ✅ form data state
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // ইনপুট হ্যান্ডেল করা
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ সাইন আপ সাবমিট হ্যান্ডলার
  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Password & Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        {
          fullname: form.fullname,
          email: form.email,
          username: form.username,
          password: form.password,
        }
      );

      toast.success("Signup successful!");
      navigate("/"); // ✅ হোমপেজে নেভিগেট করবে
      loginUserData(res.data.user)
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      style={{ backgroundColor: pageBgColor }}
      className="flex items-center justify-center min-h-screen mt-4 lg:mt-26"
    >
      <div className="w-full max-w-7xl border-2 border-blue-500 rounded-md p-6 md:flex">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2
            style={{
              color: buttonFontColor,
              borderColor: buttonFontColor,
            }}
            className="text-center text-xl font-semibold border-b pb-2 mb-6"
          >
            Sign up
          </h2>

          <form
            onSubmit={handleSignup}
            style={{ fontSize: `${pageFontSize}px` }}
            className="space-y-4"
          >
            {/* Full Name */}
            <div>
              <label className="block text-white mb-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded bg-gray-600 text-white focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 rounded bg-gray-600 text-white focus:outline-none"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-white mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="4-15 char, allow number"
                className="w-full px-4 py-2 rounded bg-gray-600 text-white focus:outline-none"
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
                className="w-full px-4 py-2 rounded bg-gray-600 text-white focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-white mb-1">Confirm Password</label>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 rounded bg-gray-600 text-white focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-300"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                style={{
                  color: buttonFontColor,
                  backgroundColor: signupBtnColor,
                  fontSize: `${btnFontSize}px`,
                }}
                className="p-3 rounded-full hover:cursor-pointer"
              >
                <FaArrowRight size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:flex w-4/5 items-center justify-center">
          <img src={signupImage} alt="Signup Banner" className="rounded" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
