import React from "react";
import { FaGift, FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";

const Rewards = () => {
  return (
    <div className="bg-black min-h-screen text-white px-3 py-4 block md:hidden">
      {/* Birthday Points Section */}
      <div className="border border-yellow-500 rounded-md p-4 mb-4 text-center">
        <h2 className="font-bold text-xl text-white">
          Now you can earn Birthday points
        </h2>
        <p className="text-sm text-yellow-400">
          so update your birthday correctly
        </p>
        <div className="flex justify-center items-center mt-4 gap-3">
          <div className="bg-gray-700 rounded-full px-6 py-2 text-yellow-400 font-bold">
            100
          </div>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold">
            Update
          </button>
        </div>
      </div>

      {/* Withdrawal Rewards Section */}
      <div className="border border-yellow-500 rounded-md p-4 mb-4 text-center bg-gradient-to-r from-green-600 to-green-700">
        <h2 className="font-bold text-xl text-white">
          Now you can earn real money
        </h2>
        <p className="text-sm text-yellow-400">
          by reduce your daily withdrawals
        </p>
        <p className="text-xs text-gray-200 mb-2">
          view and change withdrawal settings
        </p>
        <button className="flex justify-center items-center gap-2 bg-black text-white font-semibold px-4 py-2 rounded-md mt-3">
          <FaMoneyBillWave className="text-green-400 text-lg" />
          Withdrawal Rewards
        </button>
        
      </div>

      {/* Bank Benefits Section */}
      <div className="border border-yellow-500 rounded-md p-4 text-center">
        <h2 className="font-bold text-xl text-yellow-400">Bank Benefits</h2>
        <p className="text-sm text-gray-200">
          Block some amount and earn interest!
        </p>
        <p className="text-xs text-yellow-400" >
          Various time slabs have variable interest %
        </p>
        <div className="flex justify-between items-center bg-gray-800 mt-4 rounded-md p-3">
          <div>
            <h3 className="font-bold text-yellow-400">MY BALANCE</h3>
            <p className="text-sm text-gray-300">My Reward</p>
          </div>
          <FaPiggyBank className="text-yellow-400 text-4xl" />
        </div>
        <button className="w-full bg-yellow-500 text-black font-semibold py-2 mt-3 rounded-md">
          View my Interest
        </button>
      </div>
    </div>
  );
};

export default Rewards;
