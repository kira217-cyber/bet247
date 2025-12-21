import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaGift,
  FaUsers,
  FaShareAlt,
  FaComments,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaSignInAlt,
  FaEyeSlash,
  FaEye,
  FaWallet,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router"; // ঠিক করা হয়েছে
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const {
    logo,
    navbar,
    webMenu,
    mobileMenu,
    mobileMenuSidebar,
    sidebarData,
    loginUser,
    logoutUserData,
    loginUserData,
    currency,
    userBalance,
    gameSearchQuery,     // ← Context থেকে নেওয়া
    setGameSearchQuery,  // ← Context থেকে নেওয়া
  } = useContext(AuthContext);

  const { bgColor, textColor, fontSize, bgButtonColor, signUpButtonBgColor } = navbar;
  const { loginBtnColor, signupBtnColor, btnFontSize, buttonFontColor } = mobileMenu;
  const { gradientDirection, gradientFrom, gradientTo, sideTextColor } = mobileMenuSidebar;

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
      loginUserData(res.data.user);
      navigate("/");
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const directionMap = {
    "to-t": "to top",
    "to-b": "to bottom",
    "to-l": "to left",
    "to-r": "to right",
  };
  const gradientCSSDirection = directionMap[gradientDirection] || "to right";

  const isLoggedIn = !!loginUser;

  return (
    <nav
      className="w-full text-white fixed top-0 left-0 z-50"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize: `${fontSize}px`,
      }}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center px-4 md:px-8 py-2 lg:py-4">
        {/* Left Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-14 h-10" />
          </Link>

          {/* Search Bar - এখন পুরোপুরি কাজ করে */}
          <div className="hidden lg:flex">
            <input
              type="text"
              placeholder="Search Events or Games..."
              value={gameSearchQuery}
              onChange={(e) => setGameSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg text-black w-64 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div
          className={`flex items-center ${
            isLoggedIn ? "space-x-[1px] md:space-x-4" : "space-x-4"
          }`}
        >
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-2">
                <FaUser className="text-yellow-300" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="4-15 char, allow number"
                  className="px-2 py-1 text-black rounded-md text-sm bg-white"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="8-20 char"
                    className="px-2 py-1 text-black rounded-md text-sm bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Validation Code"
                    className="px-2 py-1 text-black rounded-md text-sm bg-white pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black font-bold">
                    {Math.floor(1000 + Math.random() * 9000)}
                  </span>
                </div>
              </div>

              <button
                className="hidden lg:flex px-3 py-1 rounded"
                type="submit"
                style={{
                  backgroundColor: bgButtonColor,
                  color: textColor,
                  fontSize: `${fontSize}px`,
                }}
              >
                Login
              </button>

              <button className="lg:hidden px-3 py-1 rounded">
                <Link
                  to="/login"
                  style={{
                    backgroundColor: bgButtonColor,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                  }}
                  className="block px-3 py-1 rounded"
                >
                  Login
                </Link>
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                <FaWallet size={14} /> wallet
              </div>
              <div className="flex items-center border border-white rounded px-1 py-1 text-sm">
                <span className="flex text-[8px] md:text-[16px] text-white font-bold">
                  Main {currency}
                </span>
                <span className="font-bold ml-1 text-white">{userBalance}</span>
                <span className="ml-1 text-white">Exposure</span>
                <span className="text-red-600 px-1 rounded text-xs">0</span>
                <button className="ml-1 bg-green-600 text-white px-2 rounded text-xs font-bold">
                  +5
                </button>
                <button className="ml-1 text-white border border-white rounded-full px-2">
                  ↻
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="hidden md:flex items-center bg-green-800 text-yellow-400 border border-white rounded px-3 py-1"
                >
                  <FaUser className="mr-2" />
                  <span className="flex items-center gap-[2px]">
                    My Account <MdArrowDropDown />
                  </span>
                </button>

                {accountOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-2 border-b font-semibold text-green-800">
                      {loginUser?.username || "User"}{" "}
                      <span className="text-xs text-gray-500">GMT+5:30</span>
                    </div>
                    <ul className="text-sm">
                      <Link to="/profile" onClick={() => setAccountOpen(false)}>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                          My Profile
                        </li>
                      </Link>
                      <li onClick={() => setAccountOpen(false)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Balance Overview
                      </li>
                      <li onClick={() => setAccountOpen(false)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Account Statement
                      </li>
                      <li onClick={() => setAccountOpen(false)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        My Bets
                      </li>
                      <li onClick={() => setAccountOpen(false)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Bets History
                      </li>
                      <li onClick={() => setAccountOpen(false)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profit & Loss
                      </li>
                      <li onClick={() => setAccountOpen(false)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Results
                      </li>
                      <li onClick={() => setAccountOpen(false)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Activity Log
                      </li>
                    </ul>
                    <div className="border-t">
                      <button
                        onClick={() => {
                          logoutUserData();
                          setAccountOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden cursor-pointer" onClick={() => setOpen(!open)}>
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </div>
        </div>
      </div>

      {/* NavbarMenu */}
      <NavbarMenu webMenu={webMenu} />

      {/* Mobile Sidebar Menu - আগের মতোই */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-black/50 z-40 transform pb-20 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="h-full p-4 flex flex-col space-y-4 overflow-y-auto">
          <div
            style={{
              backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
              color: sideTextColor,
              fontSize: `${fontSize}px`,
            }}
            className="p-3 rounded-md"
          >
            <p className="font-medium">
              {isLoggedIn ? `Hi, ${loginUser?.username || "User"}` : "Hi, welcome."}
            </p>
            {!isLoggedIn ? (
              <div className="flex space-x-2 mt-2">
                <button
                  style={{
                    backgroundColor: loginBtnColor,
                    fontSize: `${btnFontSize}px`,
                    color: buttonFontColor,
                  }}
                  className="px-3 py-1 rounded"
                >
                  <Link to="/login">Login</Link>
                </button>
              </div>
            ) : (
              <p className="mt-2">
                Balance: {currency} {userBalance} | Exposure: 0
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(sidebarData || []).map((item, idx) => {
              let IconComponent;
              switch (item.icon) {
                case "FaGift": IconComponent = FaGift; break;
                case "FaUsers": IconComponent = FaUsers; break;
                case "FaShareAlt": IconComponent = FaShareAlt; break;
                case "FaComments": IconComponent = FaComments; break;
                case "FaFacebook": IconComponent = FaFacebook; break;
                case "FaTwitter": IconComponent = FaTwitter; break;
                case "FaInstagram": IconComponent = FaInstagram; break;
                default: IconComponent = FaGift;
              }
              return (
                <a
                  key={idx}
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
                    color: sideTextColor,
                    fontSize: `${fontSize}px`,
                  }}
                  className="flex flex-col items-center p-3 rounded"
                >
                  <IconComponent size={20} />
                  <span className="text-sm">{item.label}</span>
                </a>
              );
            })}
          </div>

          <div className="mt-auto flex space-x-3">
            <NavLink
              to="/"
              style={{
                backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
                color: sideTextColor,
              }}
              className="flex-1 flex items-center justify-center space-x-2 p-2 rounded"
            >
              <FaHome />
              <span>Home</span>
            </NavLink>

            {!isLoggedIn ? (
              <Link
                to="/login"
                style={{
                  backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
                  color: sideTextColor,
                }}
                className="flex-1 flex items-center justify-center space-x-2 p-2 rounded"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            ) : (
              <button
                onClick={logoutUserData}
                style={{
                  backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
                  color: sideTextColor,
                }}
                className="flex-1 flex items-center justify-center space-x-2 p-2 rounded"
              >
                <FaSignInAlt />
                <span>Log out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;