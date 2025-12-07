import React, { useContext } from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaBirthdayCake } from "react-icons/fa";
import MobileProfile from "./MobileProfile";
import { AuthContext } from "../../../context/AuthContext";

const DekstopMyProfile = () => {
  const { userBalance, currency, loginUser } = useContext(AuthContext);
  return (
    <>
      {/* Mobile View */}
      <MobileProfile />

      <div className="mt-14">
        {/* Desktop View */}
        <div className="w-full min-h-screen bg-gray-600 text-gray-200 p-4 md:p-8 hidden md:block">
          {/* Top Verification Notice */}
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 mb-6">
            <p className="flex items-center text-sm md:text-base text-blue-400">
              ⚠️ Please complete the verification below before you proceed with
              the withdrawal request.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="mt-3">
                <button className=" px-3 py-1 rounded-md text-green-400">
                  | Personal Info
                </button>
                <br />
                <div className="px-3 py-2 rounded-4xl text-green-400 bg-gray-800 w-20 ml-2">
                  Birthday
                </div>
              </div>
              <div className="mt-3">
                <button className="px-3 py-1 text-green-400 rounded-md text-blue-400">
                  | Contact Info
                </button>
                <br />
                <div className="flex">
                  <div className="px-3 py-2 rounded-4xl text-green-400 bg-gray-800 w-42 ml-2 ">
                    WhatsApp Number
                  </div>
                  <div className="px-2 py-2 rounded-4xl text-green-400 bg-gray-800 w-14 ml-2 ">
                    Email
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet & Security Info */}
          <div className="flex rounded-lg mb-6 items-center ">
            <div className="bg-gray-800 p-4  items-center w-1/2">
              <span>Main Wallet</span>
              <br />
              <span className="text-green-400 font-bold text-2xl">
                {currency} {userBalance}
              </span>
            </div>
            <div className="bg-gray-800 p-4 items-center w-1/2">
              <span>Security Level</span>
              <br />
              <span className="text-green-400 font-bold text-2xl">Safe</span>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Last Login Time</p>
                <p>
                  {new Date(loginUser?.lastLogin).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" • "}
                  {new Date(loginUser?.lastLogin).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Deposit Time</p>
                <p>0</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Withdrawal Time</p>
                <p>0</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Date Registered</p>
                <p>
                  {" "}
                  {new Date(loginUser?.joinedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Promotions Section */}
          <div className="mb-6 bg-gray-800 p-6 rounded-xl">
            <h2 className="border border-amber-400 text-amber-300 inline-block px-3 py-1  text-sm font-bold mb-3">
              New Promotions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://i.ibb.co/1L2zzfH/casino1.jpg"
                  alt="Promotion 1"
                  className="w-full h-32 object-cover"
                />
                <p className="p-2 text-sm border-l-4 border-blue-500 mt-2 mb-2">
                  Casino Dhamaka 17% Bonus
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://i.ibb.co/5B5FPPt/casino2.jpg"
                  alt="Promotion 2"
                  className="w-full h-32 object-cover"
                />
                <p className="p-2 text-sm border-l-4 border-blue-500 mt-2 mb-2">
                  | 100% Deposit Bonus
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://i.ibb.co/JzKTh2z/casino3.jpg"
                  alt="Promotion 3"
                  className="w-full h-32 object-cover"
                />
                <p className="p-2 text-sm border-l-4 border-blue-500 mt-2 mb-2">
                  | Casino 20% Daily Reload Bonus Upto 3000৳
                </p>
              </div>
            </div>
          </div>

          {/* User Info Footer */}
          <div className="rounded-lg flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-800 w-full px-8 py-4 rounded-sm">
              <FaUser />
              <span>{loginUser?.username}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 bg-gray-800 w-full px-8 py-4 rounded-sm">
              <FaPhoneAlt />
              <span>------</span>
              <span className="text-red-500">✖</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 w-full px-8 py-4 rounded-sm">
              <FaEnvelope />
              <span>{loginUser?.email || "-----------"}</span>
              <span className="text-red-500">✖</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 w-full px-8 py-4 rounded-sm">
              <FaBirthdayCake />
              <span>YYYY/MM/DD</span>
              <span className="text-red-500">✖</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DekstopMyProfile;
