import React, { useContext, useState } from "react";

import { FaExclamationCircle, FaWallet } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../../../context/AuthContext";
const paymentOptions = [
  {
    id: 1,
    name: "Nagad",
    image: "https://i.ibb.co.com/sdgCF1HP/icon-256x256.png",
  },
  { id: 2, name: "Bkash", image: "https://i.ibb.co.com/kszjQzZn/unnamed.webp" },
  {
    id: 3,
    name: "Rocket",
    image:
      "https://i.ibb.co.com/S4JZ706r/dutch-bangla-rocket-logo-png-seeklogo-317692.png",
  },
];

const DesktopWithdraw = () => {
  // const [showPromotions, setShowPromotions] = useState(false);
  const [amount, setAmount] = useState(0);
  const { userBalance,currency,loginUserData } = useContext(AuthContext);

  const amountOptions = [100, 500, 1000, 2000, 5000, 10000, 20000, 25000];
  return (
    <div>
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
      <div className="flex">
        <div className="bg-gray-700 text-white m-6 p-6 rounded-lg w-11/16">
          {/* Tabs */}
          <div className="flex justify-between gap-2 mb-6 pb-3 border-b-2 border-dashed border-yellow-500">
            <div>
              <h3 className="text-yellow-500 font-bold border-l-2 text-2xl pl-2">
                Funds
              </h3>
            </div>
            <div>
              <button className="bg-gray-500 text-white px-12 py-2">
                <Link to="/profile/my-wallet">Deposit</Link>
              </button>
              {/* Withdrawal */}
              <NavLink
                to="/profile/my-wallet/withdraw"
                className={({ isActive }) =>
                  `px-12 py-2 font-bold ${
                    isActive
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-500 text-white"
                  }`
                }
              >
                Withdrawal
              </NavLink>
            </div>
          </div>

          {/* Payment Method */}
          <div className=" border-b border-gray-700">
            <p className="font-bold pb-3">Payment Method</p>
            <div className="grid grid-cols-5 items-center gap-4 ">
              {paymentOptions.map((value) => (
                <div
                  className="items-center py-2 px-6 border-1 border-solid rounded-lg"
                  key={value.id}
                >
                  <div className="flex justify-center items-center mb-2">
                    <img
                      src={value.image}
                      alt=""
                      className="w-1/2 h-1/2 rounded-4xl"
                    />
                  </div>
                  <p className="text-center">{value.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <h3 className="mb-4 mt-4 font-bold">Withdraw</h3>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="mb-2 text-gray-400">
              <span className="text-sky-400">Amount</span>{" "}
              <span className="text-yellow-400 ml-3">৳ 1,000 - ৳ 49,999</span>
            </p>

            {/* Amount Buttons */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {amountOptions.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(value)}
                  className={`px-2 py-2 rounded border ${
                    amount === value
                      ? "bg-yellow-500 text-black font-bold hover:cursor-pointer"
                      : "bg-gray-700 hover:bg-gray-600 hover:cursor-pointer"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Note Box */}
            <div className="bg-blue-900 text-white p-4 rounded mb-6 text-sm font-bold">
              <p className="flex items-center gap-1">
                <FaExclamationCircle /> Reminder:<br /> 1. Please coubk check ne
                rpent's acco, t deals belore proceed ng. <br /> 2. DO NOT share your
                account wan any one to avoid losing tund or money.
              </p>
            </div>

            {/* Input and Deposit Button */}
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-1/4 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              />
              <button className="bg-yellow-500 text-white px-6 py-2 rounded font-bold">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="w-111 h-60 bg-[#1f2937] rounded-md shadow-md flex flex-col items-center justify-center relative">
            {/* Title */}
            <h2 className="absolute top-2 left-2 text-sm font-medium text-sky-400">
              Withdraw Records
            </h2>

            {/* Icon */}
            <div className="flex flex-col items-center justify-center">
              <FaWallet className="text-gray-400 text-5xl mb-2" />

              {/* Text */}
              <p className="text-gray-400 text-sm font-medium">No Data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopWithdraw;
