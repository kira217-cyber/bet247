import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  FaWallet,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../../../context/AuthContext";

const DesktopBilling = () => {
  //   const platforms = [
  //     "All",
  //     "EXCHANGE",
  //     "JILI",
  //     "KINGMAKER",
  //     "LUDO",
  //     "EVOLUTION",
  //     "BETGAMES",
  //     "REDTIGER",
  //     "SPADEGAM...",
  //     "FC",
  //     "JDB",
  //     "YL",
  //     "DRAGONS...",
  //     "PRAGMATI...",
  //     "PLAYTECH",
  //     "YESBINGO",
  //     "SEXYBCRT",
  //     "EVOLUTION",
  //     "FASTSPIN",
  //     "E1SPORT",
  //     "BIGGAMING",
  //     "PGSOFT",
  //     "SV388",
  //     "SABAVIRTUAL",
  //     "EZUGI",
  //     "SUPERSPADE",
  //     "EVOPLAY",
  //     "ONETOUCH",
  //     "SPRISE",
  //     "BOMBAYLIVE",
  //     "ROYALGAM...",
  //   ];

  //   const gameTypes = [
  //     "All",
  //     "SLOT",
  //     "FH",
  //     "EGAME",
  //     "GAMESHOW",
  //     "T10",
  //     "PremiumMatch",
  //     "Live",
  //     "TABLE",
  //     "VIRTUAL",
  //     "LOTTO",
  //     "BINGO",
  //     "CRASH",
  //     "P2P",
  //     "ESPORTS",
  //     "Sports",
  //     "PremiumFancy",
  //   ];

  const dates = ["Today", "Yesterday", "Last 7 days"];

  //   const [selectedPlatform, setSelectedPlatform] = useState("All");
  //   const [selectedGameType, setSelectedGameType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");
  const {userBalance,currency} = useContext(AuthContext);

  const renderButton = (label, selected, onClick) => (
    <button
      key={label}
      onClick={() => onClick(label)}
      className={`relative flex items-center justify-center px-4 py-2 border rounded-md text-sm text-white
            ${selected === label ? "border-yellow-400" : "border-gray-400"}
            hover:border-yellow-400 transition`}
    >
      {label}
      {selected === label && (
        <FaCheck className="absolute top-1 right-1 text-yellow-400 text-xs" />
      )}
    </button>
  );
  return (
    <>
      {/* Header */}
      <div>
        <div className="flex items-center m-6 bg-gray-700 p-4 rounded-lg">
          <div className="w-1/2">
            <p className="text-white">Main Wallet</p>
            <p className="text-green-400 text-xl font-bold">{currency} {userBalance}</p>
          </div>
          <div className="w-1/2">
            <p className="text-white">Security Level</p>
            <p className="text-green-400 font-bold">Safe</p>
          </div>
        </div>
      </div>
      {/* Billing Records */}
      <div className="m-6">
        <div className="hidden md:block bg-gray-700 text-white p-4 rounded-md shadow-lg">
          {/* Header */}
          <div className="mb-4 border-b border-dashed border-yellow-500 pb-2">
            <h2 className="text-yellow-400 font-semibold">
              {" "}
              <span className="text-2xl">|</span> Betting Records
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex mb-4">
            <Link
              to="/profile/billing-records"
              className="px-4 py-2  text-white bg-gray-400"
            >
              Settled
            </Link>

            {/* Unsettled */}
            <NavLink
              className={({ isActive }) =>
                `px-4 py-2 text-white ${
                  isActive ? "bg-blue-600 font-bold" : "bg-gray-400"
                }`
              }
            >
              Unsettled
            </NavLink>
          </div>

          {/* Date */}
          <div className="mb-6">
            <p className="text-sm mb-2">Date</p>
            <div className="grid grid-cols-6 gap-2">
              {dates.map((d) => renderButton(d, selectedDate, setSelectedDate))}
            </div>
          </div>
        </div>
      </div>
      {/* Billing Records History */}
      <div className="m-6">
        <div className="hidden md:block bg-gray-700 text-white p-4 rounded-md shadow-lg mt-4">
          {/* Top Summary */}
          <div className="bg-[#3d4c6f] p-3 rounded flex items-center gap-6 text-sm mb-4">
            <div className="flex items-center gap-2">
              <FaInfoCircle className="text-white" />
              <span>Total</span>
            </div>
            <div>
              | Turnover: <span className="text-green-400">0.00</span>
            </div>
            <div>
              | Profit/Loss: <span className="text-green-400">(0.00)</span>
            </div>
          </div>

          {/* Table */}
          <div className="border border-blue-600 rounded">
            {/* Table Head */}
            <div className="grid grid-cols-5 bg-blue-600 text-white text-sm font-semibold">
              <div className="p-2 border-r border-blue-400">Platform</div>
              <div className="p-2 border-r border-blue-400">Game Type</div>
              <div className="p-2 border-r border-blue-400">Turnover</div>
              <div className="p-2 border-r border-blue-400">Profit/Loss</div>
              <div className="p-2">Settle Date</div>
            </div>

            {/* No Data Section */}
            <div className="flex flex-col items-center justify-center py-12">
              <FaWallet className="text-6xl text-gray-400 mb-2" />
              <p className="text-gray-400">No Data</p>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center border-t border-blue-600 p-2">
              <button className="px-2 py-1 text-white hover:bg-blue-500 rounded">
                <FaChevronLeft />
              </button>
              <span className="mx-2 bg-blue-600 text-white px-3 py-1 rounded">
                1
              </span>
              <button className="px-2 py-1 text-white hover:bg-blue-500 rounded">
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopBilling;
