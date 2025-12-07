import React, { useContext, useEffect, useState } from "react";
import {
  FaWallet,
  FaHistory,
  FaSyncAlt,
  FaUserShield,
  FaFileAlt,
  FaUser,
  FaKey,
  FaEnvelope,
  FaUsers,
  FaYoutube,
  FaTelegramPlane,
  FaMoneyBillWave,
  FaBars,
  FaTimes,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { PiHandDepositBold, PiHandWithdrawFill } from "react-icons/pi";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
      loginUser,
      userBalance,
      currency
    } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  

  return (
    <>
      {/* Mobile Menu Icon */}
      <div className="hidden p-4 bg-black/50 z-40 transform text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">My Profile</h1>
        <button onClick={toggleSidebar} className="text-xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0  h-full w-64 bg-black/50 z-40 transform text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full mt-28"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block`}
      >
        <div className="p-4 flex flex-col justify-between h-full">
          {/* Profile Section */}
          <div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full mb-2"></div>
              <h2 className="text-lg font-semibold">{loginUser.fullname}</h2>
              <p className="text-yellow-400 text-sm">{currency} {userBalance}</p>

              <div className="flex items-center justify-between w-full mt-3 text-xs ">
                <span>Silver</span>
                <div className="flex-grow mx-2 bg-gray-600 h-2 rounded">
                  <div className="w-1/6 bg-yellow-400 h-full rounded"></div>
                </div>
                <span>Elite</span>
              </div>

              {/* <div className="mt-4 w-full flex justify-around">
                <div>
                  <button className="bg-gray-600 hover:bg-pink-700 p-3 rounded-full hover:cursor-pointer">
                    <NavLink to={"my-wallet"}>
                      {" "}
                      <PiHandDepositBold size={20} />
                    </NavLink>
                  </button>
                  <br />
                  <span>Deposit</span>
                </div>
                <div>
                  <button
                    to={"my-wallet"}
                    className="bg-gray-600 hover:bg-pink-700 p-3 rounded-full hover:cursor-pointer"
                  >
                    <NavLink to={"my-wallet/withdraw"}>
                      <PiHandWithdrawFill size={20}/>

                    </NavLink>
                  </button>
                  <br />
                  <span>Withdraw</span>
                </div>
              </div> */}
            </div>

            {/* Funds */}
            <div className="mt-44">
              <h3 className="text-sm font-bold  mb-2">Funds</h3>
              <ul className="space-y-2">
                <NavLink className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                  <FaHistory /><Link to={"billing-records"}> Betting Records</Link>
                </NavLink>
                {/* <li className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                    <FaWallet /> <Link to={"my-wallet"}> My Wallet</Link>
                </li> */}
                <NavLink className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                  <FaSyncAlt /> Turnover
                </NavLink>
                <NavLink className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                  <FaUserShield /> <Link to={'/profile/vip'}>VIP</Link>
                </NavLink>
                <NavLink className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                  <FaFileAlt /> <Link to={"/profile/transaction-records"}> Transaction Records</Link>
                </NavLink>
              </ul>
            </div>

            {/* Profile */}
            <div className="mt-6">
              <h3 className="text-sm font-bold mb-2">Profile</h3>
              <ul className="space-y-2">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer"
                >
                  <FaUser /> Personal Info
                </NavLink>
                <NavLink className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                  <FaKey /> <Link to={"/profile/reset-password"}> Reset Password</Link>
                </NavLink>
                <NavLink className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                  <FaEnvelope /><Link to='/profile/inbox'> Inbox</Link>
                </NavLink>
                <NavLink className="flex items-center gap-2 hover:text-white text-gray-300 cursor-pointer">
                  <FaUsers /> Referral Program
                </NavLink>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="relative mt-5">
            <span className="absolute ">Social Community</span>
            <div className="mt-6 flex gap-3 justify-between hover:cursor-pointer">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-2 rounded text-sm hover:cursor-pointer">
                <FaYoutube /> Youtube
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-2 rounded text-sm hover:cursor-pointer">
                <FaTelegramPlane /> Telegram
              </button>
            </div>
          </div>
          <div className="relative mt-5">
            <span className="absolute ">Community CS</span>
            <div className="mt-6 flex gap-3 justify-between hover:cursor-pointer">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-2 rounded text-sm hover:cursor-pointer">
                <FaWhatsapp /> Whatsapp
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-2 rounded text-sm hover:cursor-pointer">
                <FaTelegram /> Telegram
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile (optional) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 transform bg-opacity-40 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
