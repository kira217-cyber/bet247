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
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

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
    currency, userBalance
  } = useContext(AuthContext);

  const { bgColor, textColor, fontSize, bgButtonColor, signUpButtonBgColor } =
    navbar;
  const {
    webMenuBgColor,
    webMenuTextColor,
    webMenuFontSize,
    webMenuHoverColor,
  } = webMenu;

  const { loginBtnColor, signupBtnColor, btnFontSize, buttonFontColor } =
    mobileMenu;

  const { gradientDirection, gradientFrom, gradientTo, sideTextColor } =
    mobileMenuSidebar;

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
      console.log(res)

      // Save to AuthContext & localStorage
      loginUserData(res.data.user);

      navigate("/");
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error.response?.data?.message || "Login failed");
    }
  };



  // gradient direction map
  const directionMap = {
    "to-t": "to top",
    "to-b": "to bottom",
    "to-l": "to left",
    "to-r": "to right",
  };

  const gradientCSSDirection = directionMap[gradientDirection] || "to right";

  const isLoggedIn = !!loginUser; // ✅ Real login check

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
          {!isLoggedIn && (
            <Link to="/" className="text-2xl font-bold text-yellow-400">
              <img src={logo} alt="" className="w-14 h-10" />
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/">
              <h1 className="hidden md:flex text-2xl font-bold text-yellow-400">
                <img src={logo} alt="" className="w-14 h-10" />
              </h1>
            </Link>
          )}
          <div className="hidden lg:flex">
            <input
              type="text"
              placeholder="Search Events"
              className="px-3 py-1 rounded-md text-black w-64 bg-white"
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
            // যখন লগইন হয়নি তখন লগইন ইনপুট আর বাটন দেখাবে
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
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="8-20 char"
                    className="w-full px-2 py-1 text-black rounded-md text-sm bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Validation Code"
                    className="w-full px-2 py-1 text-black rounded-md text-sm bg-white pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-black font-bold">
                    9558
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
              <button
                className="lg:hidden px-3 py-1 rounded "
                style={{
                  backgroundColor: bgButtonColor,
                  color: textColor,
                  fontSize: `${fontSize}px`,
                }}
              >
                <Link to="/login">Login</Link>
              </button>

              <button
                className="px-3 py-1 rounded "
                style={{
                  backgroundColor: signUpButtonBgColor,
                  color: textColor,
                  fontSize: `${fontSize}px`,
                }}
              >
                <Link to="/signup">Signup</Link>
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-1">
              {/* wallet */}
              <div className="flex items-center gap-1">
                <FaWallet size={14} /> wallet
              </div>
              {/* Balance Section */}
              <div className="flex items-center border border-white rounded px-1 py-1  text-sm">
                <span className="flex text-[8px] md:text-[16px] text-white font-bold">
                  Main {currency}{" "}
                </span>
                <span className="font-bold ml-1 text-white">
                  {userBalance}
                </span>
                <span className="ml-1 text-white">Exposure</span>
                <span className=" text-red-600 px-1 rounded text-xs">0</span>
                <button className="ml-1 bg-green-600 text-white px-2 rounded text-xs font-bold">
                  +5
                </button>
                <button className="ml-1 text-white border border-white rounded-full px-2">
                  &#8635;
                </button>
              </div>

              {/* My Account Section */}
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
                      <Link to="/profile">
                        <li
                          onClick={() => setAccountOpen(false)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          My Profile
                        </li>
                      </Link>
                      <li
                        onClick={() => setAccountOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Balance Overview
                      </li>
                      <li
                        onClick={() => setAccountOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Account Statement
                      </li>
                      <li
                        onClick={() => setAccountOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        My Bets
                      </li>
                      <li
                        onClick={() => setAccountOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Bets History
                      </li>
                      <li
                        onClick={() => setAccountOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Profit & Loss
                      </li>
                      <li
                        onClick={() => setAccountOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Results
                      </li>
                      <li
                        onClick={() => setAccountOpen(false)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
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

          {/* Mobile Menu Icon */}
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </div>
        </div>
      </div>

      {/* Bottom Menu (Desktop) */}
      <div
        className="hidden lg:flex web-menu-btn"
        style={{
          backgroundColor: webMenuBgColor,
          color: webMenuTextColor,
          fontSize: `${webMenuFontSize}px`,
        }}
      >
        <div className="flex px-4 md:px-8 py-2 space-x-6 font-medium">
          {[
            "Home",
            "Play-In",
            "Multi",
            "Cricket",
            "Soccer",
            "Tennis",
            "Result",
          ].map((item, index) => {
            const [hover, setHover] = React.useState(false);
            return (
              <NavLink
                key={index}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `relative ${isActive ? "font-extrabold underline" : ""}`
                }
                style={{
                  color: hover ? webMenuHoverColor : webMenuTextColor,
                  transition: "color 0.3s",
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {item}
              </NavLink>
            );
          })}
          <a
            href="#"
            style={{
              color: webMenuTextColor,
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = webMenuHoverColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = webMenuTextColor)
            }
          >
            Casino
          </a>
        </div>

        <div className="flex px-4 md:px-8 py-2 space-x-6 font-medium ml-auto">
          {["Time Zone", "On Click Bet", "Settings"].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex items-center"
              style={{
                color: webMenuTextColor,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = webMenuHoverColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = webMenuTextColor)
              }
            >
              {item === "Settings" && <IoSettings size={16} className="mr-1" />}
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-black/50 z-40 transform pb-20 ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="h-full p-4 flex flex-col space-y-4 overflow-y-auto">
          {/* Profile Section */}
          <div
            style={{
              backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
              color: sideTextColor,
              fontSize: `${fontSize}px`,
            }}
            className="p-3 rounded-md"
          >
            <p className="font-medium">
              {isLoggedIn
                ? `Hi, ${loginUser?.username || "User"}`
                : "Hi, welcome."}
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
                <button
                  style={{
                    backgroundColor: signupBtnColor,
                    fontSize: `${btnFontSize}px`,
                    color: buttonFontColor,
                  }}
                  className="px-3 py-1 rounded"
                >
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
            ) : (
              <p className="mt-2">
                Balance: {currency} {userBalance} | Exposure: 0
              </p>
            )}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-2 gap-3">
            {(sidebarData || []).map((item, idx) => {
              let IconComponent;
              switch (item.icon) {
                case "FaGift":
                  IconComponent = FaGift;
                  break;
                case "FaUsers":
                  IconComponent = FaUsers;
                  break;
                case "FaShareAlt":
                  IconComponent = FaShareAlt;
                  break;
                case "FaComments":
                  IconComponent = FaComments;
                  break;
                case "FaFacebook":
                  IconComponent = FaFacebook;
                  break;
                case "FaTwitter":
                  IconComponent = FaTwitter;
                  break;
                case "FaInstagram":
                  IconComponent = FaInstagram;
                  break;
                default:
                  IconComponent = FaGift;
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

          {/* Bottom Buttons */}
          <div className="mt-auto flex space-x-3">
            <div
              style={{
                backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
                color: sideTextColor,
              }}
              className="flex-1 flex items-center justify-center space-x-2 p-2 rounded"
            >
              <FaHome />
              <span>Home</span>
            </div>

            {!isLoggedIn ? (
              <div
                style={{
                  backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
                  color: sideTextColor,
                }}
                className="flex-1 flex items-center justify-center space-x-2 p-2 rounded"
              >
                <FaSignInAlt />
                <Link to="/login">Login</Link>
              </div>
            ) : (
              <div
                style={{
                  backgroundImage: `linear-gradient(${gradientCSSDirection}, ${gradientFrom}, ${gradientTo})`,
                  color: sideTextColor,
                }}
                className="flex-1 flex items-center justify-center space-x-2 p-2 rounded"
                onClick={logoutUserData}
              >
                <FaSignInAlt />
                <span>Log out</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
