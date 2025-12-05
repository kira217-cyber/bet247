import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const MobileDeposit = () => {
  const [promotion, setPromotion] = useState("Normal");
  //   const [paymentMethod, setPaymentMethod] = useState("Nagad");
  const [amount, setAmount] = useState(0);

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
      <div className="flex items-center justify-between ">
        <NavLink
          className={({ isActive }) =>
            `px-6 py-2 font-bold w-full text-center ${
              isActive ? "bg-black text-white text-lg" : "bg-gray-500 text-white"
            }`
          }
        >
          Deposit
        </NavLink>

        {/* Withdrawal */}
        <Link
          to="/profile/my-wallet/withdraw"
          className='px-6 py-2 bg-gray-500 text-white w-full text-center'
        >
          Withdrawal
        </Link>
      </div>

      {/* Select Promotion */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <p className="font-bold">Select Promotion</p>
        <select
          value={promotion}
          onChange={(e) => setPromotion(e.target.value)}
          className="bg-gray-800 px-2 py-1 rounded"
        >
          <option value="Normal">Normal</option>
          <option value="Bonus">Bonus</option>
        </select>
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
          <span className="text-yellow-400 text-2xl">|</span> Deposit Channel
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

export default MobileDeposit;
