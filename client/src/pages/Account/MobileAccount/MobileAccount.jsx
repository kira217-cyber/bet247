import { Link } from "lucide-react";
import React, { useContext, useState } from "react";
import { CiLogin } from "react-icons/ci";
import {
  FaWallet,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaExchangeAlt,
  FaEyeSlash,
  FaEye,
  FaSync,
  FaLock,
} from "react-icons/fa";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { IoGiftSharp, IoInformationCircleOutline } from "react-icons/io5";
import {
  MdBarChart,
  MdEmail,
  MdEnergySavingsLeaf,
  MdGroupAdd,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

const MobileAccount = () => {
  const [showAmount, setShowAmount] = useState(false);
  const [amount, setAmount] = useState(0);
  const { userBalance, currency, loginUser, logoutUserData } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // রিফ্রেশ বাটনে ক্লিক করলে নতুন ভ্যালু সেট করার ডেমো ফাংশন
  const handleReload = () => {
    setAmount(userBalance);
  };
  const handleLogout = () => {
    logoutUserData(); // লগআউট ফাংশন কল
    navigate("/"); // হোম পেজে নিয়ে যাও
  };
  return (
    <>
      <div className="md:hidden relative w-full mx-auto bg-gray-800 text-white overflow-hidden shadow-lg">
        <span className="absolute  w-10 h-10 -top-2 -right-2 text-white bg-black cursor-pointer  rounded-full z-50 p-3">
          <NavLink to={"/"}>
            <RxCross2 size={16} />
          </NavLink>
        </span>
        {/* Header */}
        <div className="relative bg-gradient-to-b from-yellow-400 to-yellow-600 p-5 flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-orange-600">
            U
          </div>
          <div className="ml-3">
            <h2 className="font-semibold text-lg">{loginUser?.username}</h2>
            <p className="text-xs bg-gray-800 px-2 py-0.5 rounded-md mt-1 inline-block">
              VIP Points (VP) <span className="text-green-400">0.00</span> | My
              VIP »
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-4 md:hidden">
        {/* Wallet */}
        <div className="bg-gray-600 px-4 py-3 flex justify-between items-center mt-5 rounded-sm">
          {/* Left side */}
          <div className="flex items-center gap-2">
            <p className="text-yellow-400">Main Wallet</p>
            {/* Reload button */}
            <button onClick={handleReload}>
              <FaSync className="text-yellow-400 cursor-pointer" />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <p className="text-yellow-400 font-semibold">
              {currency} {showAmount ? `৳ ${userBalance}` : "****"}
            </p>
            <button onClick={() => setShowAmount(!showAmount)}>
              {showAmount ? (
                <FaEyeSlash className="text-yellow-400" />
              ) : (
                <FaEye className="text-yellow-400" />
              )}
            </button>
          </div>
        </div>
        {/* Funds Section */}
        <div className="p-4 bg-gray-600 mt-5 rounded-sm">
          <h3 className="text-yellow-400 text-xl font-bold mb-3 border-l-3 pl-2">
            Funds
          </h3>
          <hr className="w-full mb-5" />
          <div className="grid grid-cols-4 gap-3 text-center">
            {/* Deposit */}
            {/* <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/my-wallet">
                  {" "}
                  <FaWallet className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Deposit</p>
            </div> */}

            {/* Dispute */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/real-wallet/transactions">
                  {" "}
                  <FaEyeSlash className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Dispute</p>
            </div>

            {/* My Wallet */}
            {/* <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/my-wallet">
                  {" "}
                  <FaWallet className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">My Wallet</p>
            </div> */}

            {/* Withdrawal */}
            {/* <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/my-wallet/withdraw">
                  {" "}
                  <FaHandHoldingUsd className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Withdrawal</p>
            </div> */}
          </div>
        </div>
        {/* MY P&L */}
        <div className="p-4 bg-gray-600 mt-5 rounded-sm">
          <h3 className="text-yellow-400 text-xl font-bold mb-3 border-l-3 pl-2">
            MY P&L
          </h3>
          <hr className="w-full mb-5" />
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Deposit */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/real-wallet/active">
                  <MdBarChart className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">turnover</p>
            </div>

            {/* Dispute */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/real-wallet/rewards">
                  <IoGiftSharp className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">My Reward</p>
            </div>

            {/* My Wallet */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/real-wallet/pl/pl-all">
                  <MdEnergySavingsLeaf className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">P&L</p>
            </div>
          </div>
        </div>
        {/* History */}
        <div className="p-4 bg-gray-600 mt-5 rounded-sm">
          <h3 className="text-yellow-400 text-xl font-bold mb-3 border-l-3 pl-2">
            History
          </h3>
          <hr className="w-full mb-5" />
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Deposit */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/billing-records">
                  <FaMoneyBillWave className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Betting Records</p>
            </div>

            {/* Dispute */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/parley-records">
                  <FaExchangeAlt className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Parley Records</p>
            </div>

            {/* My Wallet */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/real-wallet/transactions">
                  <FaSync className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Transaction Records</p>
            </div>
          </div>
        </div>
        {/* Profile */}
        <div className="p-4 bg-gray-600 mt-5 rounded-sm">
          <h3 className="text-yellow-400 text-xl font-bold mb-3 border-l-3 pl-2">
            Profile
          </h3>
          <hr className="w-full mb-5" />
          <div className="grid grid-cols-4 gap-3 text-center">
            {/* Deposit */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile">
                  {" "}
                  <IoInformationCircleOutline className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Personal Info</p>
            </div>

            {/* Dispute */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/reset-password">
                  <FaLock className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Reset Password</p>
            </div>

            {/* My Wallet */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/inbox">
                  <IoIosMail className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Inbox</p>
            </div>

            {/* Withdrawal */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <NavLink to="/profile/real-wallet/referral">
                  {" "}
                  <MdGroupAdd className="text-white text-xl" />
                </NavLink>
              </div>
              <p className="text-white mt-1">Referral</p>
            </div>
          </div>
        </div>
        {/* Contact Us */}
        <div className="p-4 bg-gray-600 mt-5 rounded-sm">
          <h3 className="text-yellow-400 text-xl font-bold mb-3 border-l-3 pl-2">
            Contact Us
          </h3>
          <hr className="w-full mb-5" />
          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Deposit */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <IoLogoWhatsapp className="text-white text-xl" />
              </div>
              <p className="text-white mt-1">Whatsapp</p>
            </div>

            {/* Dispute */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-700 w-12 h-12 flex items-center justify-center rounded-md">
                <MdEmail className="text-white text-xl" />
              </div>
              <p className="text-white mt-1">Email</p>
            </div>
          </div>
        </div>
        {/* Logout */}
        <p
          onClick={handleLogout}
          className="p-4 flex items-center gap-1 justify-center bg-gray-600 mt-5 rounded-sm text-white font-bold py-3 hover:cursor-pointer"
        >
          <CiLogin size={18} /> Logout
        </p>
      </div>
    </>
  );
};

export default MobileAccount;
