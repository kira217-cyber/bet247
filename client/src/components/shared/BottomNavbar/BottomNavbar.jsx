import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { Home, Trophy, Play, Layers, User } from "lucide-react";
import { SiNintendogamecube } from "react-icons/si";
import { AuthContext } from "../../../context/AuthContext";

const BottomNavbar = () => {
  const [path, setPath] = useState("/my-account");
  const { loginUser } = useContext(AuthContext); // লগইন স্টেট চেক করার জন্য
  const navigate = useNavigate();

  // মোবাইল/ডেস্কটপ অনুযায়ী path সেট করা
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // lg এর নিচে = মোবাইল/ট্যাব
        setPath("/my-account");
      } else {
        // lg বা তার বেশি = ডেস্কটপ
        setPath("/account");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Account আইকনে ক্লিক হ্যান্ডলার
  const handleAccountClick = (e) => {
    if (!loginUser) {
      e.preventDefault(); // NavLink এ যাওয়া বন্ধ
      navigate("/login"); // লগইন পেজে পাঠাও
    }
    // যদি লগইন থাকে তাহলে স্বাভাবিকভাবে path এ যাবে
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-800 text-white flex justify-around items-center py-3 shadow-2xl z-50 border-t border-gray-700">
      {/* Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive ? "text-yellow-400 scale-110" : "text-gray-300"
          }`
        }
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>

      {/* My-Bets */}
      <NavLink
        to="/my-bets"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive ? "text-yellow-400 scale-110" : "text-gray-300"
          }`
        }
      >
        <SiNintendogamecube size={24} />
        <span className="text-xs mt-1">My Bets</span>
      </NavLink>

      {/* Sports */}
      <NavLink
        to="/sports"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive ? "text-yellow-400 scale-110" : "text-gray-300"
          }`
        }
      >
        <Trophy size={24} />
        <span className="text-xs mt-1">Sports</span>
      </NavLink>

      {/* In-Play */}
      <NavLink
        to="/play-in"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive ? "text-yellow-400 scale-110" : "text-gray-300"
          }`
        }
      >
        <Play size={24} />
        <span className="text-xs mt-1">In-Play</span>
      </NavLink>

      {/* Multi Market */}
      <NavLink
        to="/multi"
        className={({ isActive }) =>
          `flex flex-col items-center transition-all duration-300 ${
            isActive ? "text-yellow-400 scale-110" : "text-gray-300"
          }`
        }
      >
        <Layers size={24} />
        <span className="text-xs mt-1">Multi M.</span>
      </NavLink>

      {/* Account - শুধু লগইন থাকলে যাবে */}
      <div onClick={handleAccountClick} className="cursor-pointer">
        <NavLink
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center transition-all duration-300 ${
              isActive ? "text-yellow-400 scale-110" : "text-gray-300"
            }`
          }
        >
          <User size={24} />
          <span className="text-xs mt-1">Account</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavbar;
