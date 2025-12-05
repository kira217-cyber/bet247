import React, { useContext, useState } from "react";
import { NavLink } from "react-router"; // <-- সঠিক ইম্পোর্ট
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaRedo,
  FaSignOutAlt,
  FaMicrophone,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const AdNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, logout, logo, balance, currency } = useContext(AuthContext);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleLogout = () => logout();

  // Role অনুযায়ী বেস পাথ নির্ধারণ
  const dashboardBaseByRole = {
    "Mother Admin": "/admin-dashboard",
    "Sub Admin": "/sub-admin-dashboard",
    Master: "/master-dashboard",
    Agent: "/agent-dashboard",
    "Sub Agent": "/sub-agent-dashboard",
    // যদি কোনো role ম্যাচ না করে তাহলে ডিফল্ট admin-dashboard
  };

  const basePath = dashboardBaseByRole[user?.role] || "/admin-dashboard";

  // সব রাউটে basePath যোগ করে নতুন navItems তৈরি করা হলো
  const navItems = [
    { name: "Dashboard", path: `${basePath}` },
    {
      name: "User",
      dropdown: [
        { name: "User", path: `${basePath}/users` },
        { name: "Sub Agent", path: `${basePath}/sub-agent` },
        { name: "Agent", path: `${basePath}/agent` },
        { name: "Master", path: `${basePath}/master` },
        { name: "Sub Admin", path: `${basePath}/sub-admin` },
        { name: "Mother Admin", path: `${basePath}/admin` },
      ],
    },
    {
      name: "Setting",
      dropdown: [
        { name: "General Setting", path: `${basePath}/general-setting` },
        { name: "Admin Setting", path: `${basePath}/admin-setting` },
        { name: "Game Api Key", path: `${basePath}/game-api-key` },
        { name: "Home Control", path: `${basePath}/home-control` },
        { name: "Color Control", path: `${basePath}/color-control` },
        { name: "Add Game Api key", path: `${basePath}/add-game-api-key` },
      ],
    },
    { name: "My Account", path: `${basePath}/my-account` },
    { name: "BetList", path: `${basePath}/bet-lists` },
    { name: "BetListLive", path: `${basePath}/bet-list-live` },
    {
      name: "Banking",
      dropdown: [
        { name: "Money Transfer", path: `${basePath}/banking` },
        {
          name: "Check Users Payment",
          path: `${basePath}/check-users-payment`,
        },
        { name: "Deposit History", path: `${basePath}/deposit-history` },
      ],
    },
    {
      name: "Casino",
      dropdown: [
        { name: "Progmatic Play", path: `${basePath}/progmatic-play` },
        { name: "Evolution", path: `${basePath}/evolution` },
        { name: "BGaming", path: `${basePath}/b-gaming` },
        { name: "Amusnet", path: `${basePath}/amusnet` },
        { name: "PG Soft", path: `${basePath}/pg-soft` },
        { name: "Play and Go", path: `${basePath}/play-and-go` },
        { name: "Play Tech", path: `${basePath}/play-tech` },
        { name: "No Limit City", path: `${basePath}/no-limit-city` },
        { name: "Hack Saw", path: `${basePath}/hack-saw` },
      ],
    },
    { name: "Risk Management", path: `${basePath}/risk-management` },
    {
      name: "Import",
      dropdown: [
        { name: "Game File Import", path: `${basePath}/game-file-import` },
        { name: "API Import", path: `${basePath}/api-import` },
      ],
    },
    { name: "Message", path: `${basePath}/message` },
    {
      name: "Game Center",
      dropdown: [
        { name: "Active Game", path: `${basePath}/active-game` },
        { name: "Deactive Game", path: `${basePath}/deactive-game` },
        { name: "Live Game", path: `${basePath}/Live-game` },
      ],
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <nav className="w-full bg-[#1f2937] px-2 py-4 md:px-8 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10 md:h-12" />
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4 text-sm text-white">
            <span>
              <strong className="text-xl">{user?.fullname}</strong>{" "}
              <span className="text-gray-400 text-sm">({user?.role})</span>
            </span>
            <span className="text-yellow-500 font-semibold text-xl">
              - Main Balance:{" "}
              <span className="text-white">
                {balance} {currency}
              </span>
            </span>

            <button className="p-2 hover:bg-gray-700 rounded-full">
              <FaRedo className="text-white" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <FaSignOutAlt onClick={handleLogout} className="text-white" />
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <FaRedo className="text-white" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <FaSignOutAlt onClick={handleLogout} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile User Info */}
        <div className="flex items-center justify-between mt-2 text-xs text-white md:hidden">
          <span>
            <strong className="text-[14px]">{user?.username}</strong>{" "}
            <span className="text-gray-400">({user?.role})</span>
          </span>
          <span className="text-yellow-500 font-semibold text-[14px]">
            - Main Balance:{" "}
            <span className="text-white">
              {balance} {currency}
            </span>
          </span>
        </div>
      </nav>

      {/* Main Navigation Bar */}
      <nav className="bg-yellow-500 text-black shadow-md">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center h-12">
            {/* Mobile Toggle */}
            <div className="flex items-center">
              <button
                className="lg:hidden text-xl mr-2"
                onClick={toggleSidebar}
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-1 ml-6">
              {navItems.map((item, index) =>
                item.dropdown ? (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => handleDropdown(item.name)}
                      className="flex items-center px-3 py-2 hover:bg-yellow-600"
                    >
                      {item.name} <FaChevronDown className="ml-1 text-xs" />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="absolute z-50 left-0 top-full w-44 border border-gray-300 bg-gray-100">
                        {item.dropdown.map((drop, i) => (
                          <NavLink
                            key={i}
                            to={drop.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 border-b border-gray-300 ${
                                isActive
                                  ? "bg-yellow-400 text-black font-bold"
                                  : "hover:bg-gray-200"
                              }`
                            }
                            onClick={() => setActiveDropdown(null)}
                          >
                            {drop.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={index}
                    to={item.path}
                    end={item.path === basePath} // Dashboard এর জন্য end=true
                    className={({ isActive }) =>
                      `px-3 py-2 ${
                        isActive
                          ? "bg-yellow-400 font-bold"
                          : "hover:bg-yellow-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-yellow-600 text-black transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div onClick={toggleSidebar} className="p-4 font-bold text-lg">
            <FaTimes />
          </div>
          <div className="flex flex-col space-y-1">
            {navItems.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="border-b border-yellow-500">
                  <button
                    onClick={() => handleDropdown(item.name)}
                    className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-yellow-500"
                  >
                    {item.name} <FaChevronDown />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="border border-gray-300 bg-gray-100">
                      {item.dropdown.map((drop, i) => (
                        <NavLink
                          key={i}
                          to={drop.path}
                          className={({ isActive }) =>
                            `block px-6 py-2 border-b border-gray-300 ${
                              isActive
                                ? "bg-yellow-400 font-bold"
                                : "hover:bg-gray-200"
                            }`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          {drop.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={item.path}
                  end={item.path === basePath}
                  className={({ isActive }) =>
                    `px-4 py-2 ${
                      isActive
                        ? "bg-yellow-400 font-bold"
                        : "hover:bg-yellow-500"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Bottom News Bar */}
      <nav className="w-full bg-[#1f2937] px-2 py-1">
        <div className="flex justify-start items-center gap-2 border-r border-white w-24 rounded-2xl p-1">
          <FaMicrophone color="white" size={20} />
          <p className="text-white">News</p>
        </div>
      </nav>
    </>
  );
};

export default AdNavbar;
