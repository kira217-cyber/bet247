import React, { useContext, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import {
  FaSyncAlt,
  FaInfoCircle,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { AuthContext } from "../../../../../context/AuthContext";

const MobileWithdraw = () => {
  const [promotion, setPromotion] = useState("Normal");
  //   const [paymentMethod, setPaymentMethod] = useState("Nagad");
  const [amount, setAmount] = useState(0);
  const {userBalance,currency} = useContext(AuthContext)

  const amountOptions = [100, 500, 1000, 2000, 5000, 10000, 20000, 25000];
  const paymentOptions = [
    {
      id: 1,
      name: "Nagad",
      image: "https://i.ibb.co.com/sdgCF1HP/icon-256x256.png",
    },
    {
      id: 2,
      name: "Bkash",
      image: "https://i.ibb.co.com/kszjQzZn/unnamed.webp",
    },
    {
      id: 3,
      name: "Rocket",
      image:
        "https://i.ibb.co.com/S4JZ706r/dutch-bangla-rocket-logo-png-seeklogo-317692.png",
    },
  ];
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="bg-yellow-500 text-black px-4 py-3 font-bold flex items-center">
        <span className="mr-2 w-28 ">
          <Link to={"/"}>
            <FaArrowCircleLeft size={20} />
          </Link>
        </span>{" "}
        <span>Funds</span>
      </div>

      {/* Tabs */}
      <div className="flex  justify-between items-center">
        <Link
          to={"/profile/my-wallet"}
          className="px-6 py-2 w-full bg-gray-500 text-white text-center"
        >
          Deposit
        </Link>

        {/* Withdrawal */}
        <NavLink
          className={({ isActive }) =>
            `px-6 py-2 w-full text-center ${
              isActive
                ? "bg-black text-white text-lg font-bold"
                : "bg-gray-500 text-white"
            }`
          }
        >
          Withdrawal
        </NavLink>
      </div>

      {/* Wallet Information */}
      <div className="block md:hidden p-3">
        {" "}
        {/* Main Wallet Section */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Main Wallet</h2>
            <FaSyncAlt className="text-gray-300 cursor-pointer" />
          </div>

          {/* Balance */}
          <p className="text-3xl font-bold mt-2">{currency} {userBalance}</p>

          {/* Sub Info */}
          <div className="mt-2 text-sm space-y-1">
            <p>
              Withdrawable Amount <span className="float-right">0.00</span>
            </p>
            <p>
              Amount on hold <span className="float-right">0.00</span>
            </p>
          </div>

          {/* Warning */}
          <p className="text-xs text-gray-400 mt-1">
            Due To Incomplete Turnover
          </p>
        </div>
        {/* Verification Section */}
        <div className="bg-gray-900 text-white mt-4 p-4 rounded-lg shadow-md border border-green-600">
          <div className="flex items-start text-white gap-2">
            <FaInfoCircle size={20} className=" mt-1" />
            <p className="text-sm">
              Please complete the verification below before you proceed with the
              withdrawal request.
            </p>
          </div>

          {/* Contact Info */}
          <div className="mt-4 border-t border-green-700 pt-3">
            <h3 className="text-sm font-semibold mb-2">
              <span className="font-bold text-blue-600">|</span> Contact Info
            </h3>
            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                <FaEnvelope /> Email
              </button>
              <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white text-sm">
                <FaWhatsapp /> WhatsApp Number
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="p-4 border-b border-gray-700">
        <p className="font-bold mb-3 border-b border-gray-400 pb-3">
          <span className="text-yellow-400 text-2xl">|</span> Payment Method
        </p>
        <div className="flex justify-between items-center gap-2">
          {paymentOptions.map((value) => (
            <div
              className="items-center py-2 px-5 border-1 border-solid"
              key={value.id}
            >
              <img
                src={value.image}
                alt=""
                className="w-full h-10 rounded-4xl"
              />
              <p>{value.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Channel */}
      <div className="p-4 border-b border-gray-700">
        <p className="font-bold mb-3 border-b border-gray-400 pb-3">
          <span className="text-yellow-400 text-2xl">|</span> Withdraw Channel
        </p>
        {/* Amount */}
        <div className="flex items-center justify-between border-b border-gray-400 mb-3">
          <p className="font-bold mb-2">
            <span className="text-2xl text-yellow-400">|</span> Amount
          </p>
          <p className="text-gray-400 font-bold">৳100.00 - ৳25000.00</p>
        </div>

        {/* Amount Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {amountOptions.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
              className={`px-2 py-1 rounded ${
                amount === value
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-gray-700"
              }`}
            >
              {value}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-xl">৳</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Instruction */}

        <div className="bg-black m-3 border border-gray-700 rounded-lg">
          <p className="p-4 font-bold">
            {" "}
            <span className="flex items-center gap-1"><FaInfoCircle size={20} className=" text-lg mt-1" /> Reminder:{" "}</span>
            <br /> 1. Please coubk check ne rpent's acco, t deals belore proceed
            ng. <br /> 2. DO NOT share your account wan any one to avoid losing
            tund or money.
          </p>
        </div>


      {/* Submit Button */}
      <div className="p-4">
        <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded">
          Submit
        </button>
      </div>

      {/* Help Section */}
      <div className="p-4">
        <div className="bg-gray-800 p-3 rounded flex justify-between items-center">
          <p>কিভাবে টাকা জমা করতে হয়?</p>
          <span className="bg-green-500 px-2 py-1 rounded-full">▶</span>
        </div>
      </div>
    </div>
  );
};

export default MobileWithdraw;
