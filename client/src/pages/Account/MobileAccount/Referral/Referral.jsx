import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiCopy, FiShare2 } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaCrown, FaMedal } from "react-icons/fa";

const Referral = () => {
  const rewards = [
    { id: "936*****d", amount: "2541 ৳", date: "2025-09-13" },
    { id: "a87*****3", amount: "4139 ৳", date: "2025-09-13" },
    { id: "483*****2", amount: "2546 ৳", date: "2025-09-13" },
    { id: "337*****4", amount: "2837 ৳", date: "2025-09-13" },
    { id: "ec5*****8", amount: "2864 ৳", date: "2025-09-13" },
  ];

  return (
    <>
      <div className="w-full max-w-sm mx-auto bg-gray-900 p-4 text-white">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">
            How to earn more rewards
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-xl">
                1
              </div>
              <p className="text-xs mt-1">Send an invitation</p>
            </div>

            <span className="text-gray-400 text-xl">›</span>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
                2
              </div>
              <p className="text-xs mt-1">Friend registration</p>
            </div>

            <span className="text-gray-400 text-xl">›</span>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-xl">
                3
              </div>
              <p className="text-xs mt-1">Get rewarded</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gray-700" />

        {/* Referral Section */}
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="text-sm mb-2">Your Referral Code</h3>
          <p className="text-yellow-400 font-mono text-sm mb-3 break-all">
            NKvxp30Q_JVODundpCc09g==
          </p>

          {/* QR Placeholder */}
          <div className="w-40 h-40 mx-auto bg-white rounded-md overflow-hidden flex items-center justify-center">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NKvxp30Q_JVODundpCc09g=="
              alt="QR Code"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex space-x-3 justify-center">
            <button className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium text-sm">
              <FiCopy className="mr-2" /> Copy Link
            </button>
            <button className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium text-sm">
              <FiShare2 className="mr-2" /> Share
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto bg-gray-900 p-4 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-base font-semibold">Cash Reward Ratio</h2>
            <p className="text-xs text-gray-300">
              Turnover Range : More Than 100
            </p>
          </div>
          <FaArrowRight className="text-gray-300" />
        </div>

        {/* Tier Section */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-2">
            <span className="text-sm">Tier1</span>
            <span className="text-yellow-400 text-sm">(0.1%)</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-2">
            <span className="text-sm">Tier2</span>
            <span className="text-yellow-400 text-sm">(0.05%)</span>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-2">
            <span className="text-sm">Tier3</span>
            <span className="text-yellow-400 text-sm">(0.05%)</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 rounded-lg p-4">
          {/* Title Row */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-yellow-400">Reward details</span>
            <FiMoreHorizontal className="text-gray-300" />
          </div>

          {/* Active Downlines */}
          <div className="flex flex-col items-center mb-3">
            <span className="text-4xl font-bold">0</span>
            <span className="text-sm text-gray-300">Active downlines</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-700 mb-3"></div>

          {/* Stats */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Lifetime Cash Rewards</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Referral Turnover</span>
              <span>0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Cash Rewards</span>
              <button className="bg-yellow-500 text-black text-xs font-medium px-3 py-1 rounded-lg">
                Claim All
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-sm mx-auto bg-gray-900 p-4 text-white">
        {/* Header */}
        <h2 className="text-center text-lg font-semibold mb-4">
          Referral leaderboard
        </h2>

        {/* Top 3 Winners */}
        <div className="grid grid-cols-3 gap-3 mb-4 relative mt-18">
          {/* Second place */}
          <div className="bg-green-600 rounded-lg p-1 flex flex-col items-center relative">
            <FaCrown className="text-3xl text-yellow-400 absolute -top-5" />
            <FaMedal className="text-5xl text-yellow-300 mb-1 mt-3" />
            <span className="text-[12px] font-bold">Second place</span>
            <p className="text-xs mt-1">us****r5</p>
            <p className="text-yellow-300 font-bold text-sm mt-1">12,777.90</p>
          </div>

          {/* First place */}
          <div className="bg-green-600 rounded-lg p-1 flex flex-col items-center relative absolute -top-7">
            <FaCrown className="text-3xl text-yellow-400 absolute -top-5" />
            <FaMedal className="text-5xl text-yellow-300 mb-1 mt-3" />
            <span className="text-[12px] font-bold">First place</span>
            <p className="text-xs mt-1">us****r8</p>
            <p className="text-yellow-300 font-bold text-sm mt-1">14,266.85</p>
          </div>

          {/* Third place */}
          <div className="bg-green-600 rounded-lg p-1 flex flex-col items-center relative">
            <FaCrown className="text-3xl text-yellow-400 absolute -top-5" />
            <FaMedal className="text-5xl text-yellow-300 mb-1 mt-3" />
            <span className="text-[12px] font-bold">Third place</span>
            <p className="text-xs mt-1">us****r9</p>
            <p className="text-yellow-300 font-bold text-sm mt-1">10,703.51</p>
          </div>
        </div>

        {/* Rewards Table */}
        <div className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-sm font-semibold mb-2">
            Who received the rewards?
          </h3>
          <div className="divide-y divide-gray-700">
            {rewards.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between py-2 text-xs text-gray-200"
              >
                <span className="w-1/3">{item.id}</span>
                <span className="w-1/3 text-center text-yellow-400">
                  {item.amount}
                </span>
                <span className="w-1/3 text-right text-gray-400">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Referral;
