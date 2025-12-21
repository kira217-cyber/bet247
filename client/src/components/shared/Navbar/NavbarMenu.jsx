import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { IoBarcodeSharp, IoSettings } from "react-icons/io5";
import axios from "axios";
import { GiCardAceHearts } from "react-icons/gi";

const NavbarMenu = ({ webMenu }) => {
  const {
    webMenuBgColor,
    webMenuTextColor,
    webMenuFontSize,
    webMenuHoverColor,
  } = webMenu;

  const [dynamicItems, setDynamicItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDynamicItems = async () => {
      try {
        const res = await axios.get(`${API}/api/navbar-dynamic-items`);
        setDynamicItems(res.data);
      } catch (error) {
        console.error("Error loading dynamic menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDynamicItems();
  }, [API]);

  return (
    <div
      className="hidden lg:flex web-menu-btn border-t border-gray-700"
      style={{
        backgroundColor: webMenuBgColor,
        color: webMenuTextColor,
        fontSize: `${webMenuFontSize}px`,
      }}
    >
      {/* Left Menu */}
      <div className="flex px-4 md:px-8 py-2 space-x-6 font-medium items-center">
        {/* Static Items */}
        {["Home", "Play-In", "Multi"].map((item) => {
          const [hover, setHover] = useState(false);
          return (
            <NavLink
              key={item}
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className={({ isActive }) =>
                `transition-colors ${
                  isActive ? "font-extrabold underline underline-offset-4" : ""
                }`
              }
              style={{
                color: hover ? webMenuHoverColor : webMenuTextColor,
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {item}
            </NavLink>
          );
        })}

        {/* Dynamic Items */}
        {loading ? (
          <span className="text-sm opacity-70">Loading games...</span>
        ) : (
          dynamicItems.map((item) => (
            <NavLink
              key={item._id}
              to={item.url}
              className={({ isActive }) =>
                `relative flex items-center gap-2 transition-colors ${
                  isActive ? "font-extrabold underline underline-offset-4" : ""
                }`
              }
              style={{
                color:
                  hoveredItem === item._id
                    ? webMenuHoverColor
                    : webMenuTextColor,
              }}
              onMouseEnter={() => setHoveredItem(item._id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.name}
              {item.liveCount > 0 && (
                <span className="absolute -top-5 -right-4 text-xs">
                  <div className="flex gap-1 items-center bg-white text-red-400 rounded-sm">
                    <span className="pl-1">
                      <IoBarcodeSharp />
                    </span>
                    <span className="bg-red-500 px-1 text-white rounded-r-sm">
                      {item.liveCount}
                    </span>
                  </div>
                </span>
              )}
            </NavLink>
          ))
        )}

        {/* ✅ Casino Button (Same URL, Custom Design) */}
        <NavLink to="/" className="flex items-center">
          <div className="flex items-center rounded overflow-hidden shadow-sm relative">
            <span className="absolute bg-red-600 text-white text-[10px] font-bold top-5 -left-2 px-2 -rotate-45 origin-top-left">
              NEW
            </span>

            <span className="bg-[#2E2F31] text-white  pl-6 py-1 text-sm font-semibold">
              <span className="flex items-center gap-1 ">
                Casino <GiCardAceHearts size={20} />
              </span>
            </span>
          </div>
        </NavLink>
      </div>

      {/* Right Menu */}
      <div className="flex px-4 md:px-8 py-2 space-x-6 font-medium ml-auto">
        {["Time Zone", "On Click Bet", "Settings"].map((item) => {
          const [hover, setHover] = useState(false);
          return (
            <a
              key={item}
              href="#"
              className="flex items-center transition-colors"
              style={{
                color: hover ? webMenuHoverColor : webMenuTextColor,
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              {item === "Settings" && <IoSettings size={16} className="mr-1" />}
              {item}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default NavbarMenu;
