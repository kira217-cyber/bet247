import React, { useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { FaWhatsapp, FaExclamationTriangle } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const MobileProfile = () => {
  const {userBalance,currency,login} = useContext(AuthContext);
  return (
    <>
      <div className="md:hidden  bg-gray-900 text-white flex flex-col mt-12">
        {/* Header */}
        <div className="flex items-center p-3 border-b border-gray-700 bg-gray-800">
          <Link to={"/"}>
            <ArrowLeft className="text-white mr-2" size={20} />
          </Link>
          <h2 className="text-lg font-semibold">Personal Info</h2>
        </div>

        {/* Banner */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 h-28 flex items-center justify-center m-4 rounded-xl">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center absolute mt-25">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-300">rai7</div>

        {/* Info Card */}
        <div className="bg-[#1f1f1f] mx-3 mt-4 p-4 rounded-xl mb-8">
          <p className="text-lg font-bold text-gray-300 mb-4">
            Please complete the verification below before you proceed with the
            withdrawal request.
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            <div>
              <h3 className="text-yellow-400 text-sm mb-2 border-l-4 p-1">
                Personal Info
              </h3>
              <button className="w-1/2 bg-yellow-400 text-black font-semibold py-2 rounded-4xl">
                Birthday
              </button>
            </div>

            <div>
              <h3 className="text-blue-400 text-sm mb-2 border-l-4 p-1">
                Contact Info
              </h3>
              <button className="w-full bg-blue-500 py-3 px-4 rounded-4xl mb-2 font-semibold">
                WhatsApp Number
              </button>
              <button className="w-full bg-blue-500 py-2 px-4 rounded-4xl font-semibold">
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-14 bg-gray-900 px-2 ">
        <div className="bg-[#1f1f1f] text-gray-200 rounded-xl w-full  mx-auto px-2 py-6 md:hidden">
        {/* Full Name + Date */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <div>
            <p className="text-sm font-semibold">Full Name</p>
            <p className="text-orange-400 text-sm">rai7</p>
          </div>
          <p className="text-xs text-gray-400">Date Registered : 2025-09-08</p>
        </div>

        {/* WhatsApp Number */}
        <div className="flex justify-between items-center mt-4 border-b border-gray-700 pb-2">
          <p className="text-sm">WhatsApp Number</p>
          <button className="bg-yellow-500 text-black px-2 py-1 rounded text-xs flex items-center gap-1">
            <FaWhatsapp /> Update
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-1">------</p>

        {/* Email */}
        <div className="mt-4 border-b border-gray-700 pb-2">
          <p className="text-sm">Email</p>
          <div className="flex justify-between items-center">
            <p className="text-white text-sm break-all">
              freelancerraihan524@gmail.com
            </p>
            <span className="flex items-center gap-1 text-yellow-500 text-xs">
              <FaExclamationTriangle /> Not Verified
            </span>
          </div>
        </div>

        {/* Birthday */}
        <div className="mt-4">
          <p className="text-sm">Birthday</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">YYYY/MM/DD</p>
            <span className="flex items-center gap-1 text-yellow-500 text-xs">
              <FaExclamationTriangle /> Not Verified
            </span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default MobileProfile;
