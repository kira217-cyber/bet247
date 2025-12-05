import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const RocketDeposit = () => {
  const [transactionId, setTransactionId] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Transaction submitted successfully!");
  };
  const number2 = "018112915958";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(number2);
    toast.success("নম্বরটি কপি হয়েছে!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f8fc] p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg border border-gray-100">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pt-6">
          <img
            src="https://i.ibb.co.com/6RXpR4Jz/dutch-bangla-rocket-logo-png-seeklogo-317692.png"
            alt="bKash Logo"
            className="w-32 mb-2"
          />
          <p className="text-gray-600 text-sm">a BRAC Bank company</p>
        </div>

        {/* Transaction Info */}
        <div className="flex justify-between items-center bg-[#f9fafb] rounded-xl border border-gray-200 mx-5 mt-6 px-4 py-3">
          <div>
            <p className="text-sm text-gray-600">লেনদেন নম্বর:</p>
            <p className="text-xs text-gray-800 mt-1 font-mono">
              68e54a6428226f8b4a20a102
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#89288F]">৳ 25000</p>
          </div>
        </div>

        {/* Deposit Form */}
        <form onSubmit={handleSubmit} className="p-4 ">
          <div className="bg-[#89288F] mt-6 px-4 py-5 rounded-xl text-white space-y-5">
            {/* Transaction ID */}
            <div>
              <label className="block font-semibold mb-2 text-center text-sm">
                ট্রানজেকশন আইডি দিন
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="ট্রানজেকশন আইডি দিন"
                className="w-full p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                required
              />
              <p className="text-xs mt-1 text-pink-100">
                দয়া করে আপনার ট্রানজেকশন আইডি দিন
              </p>
            </div>

            {/* Number */}
            <div>
              <label className="block font-semibold mb-2 text-center text-sm">
                লেনদেন নম্বর লিখুন
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                required
              />
              <p className="text-xs mt-1 text-pink-100">
                দয়া করে আপনার লেনদেন নম্বর দিন
              </p>
            </div>
{/* details */}
            <div className="space-y-2">
                {/* bKash Number */}
            <div className=" text-white">
              <ul className="list-disc pl-4">
                <li className="text-[13px] border-b border-pink-800 pb-2 font-bold">
                  *322# ডায়াল করে আপনার ROCKET মোবাইল মেনুতে যান অথবা ROCKET অ্যাপে যান।
                </li>
              </ul>
            </div>
            <div className=" text-white">
              <ul className="list-disc pl-4">
                <li className="text-[13px] border-b border-pink-800 pb-2 font-bold">
                  <span className="text-yellow-400">"Cash Out" </span>-এ ক্লিক করুন।
                </li>
              </ul>
            </div>
            <div className=" text-white">
              <ul className="list-disc pl-4">
                <li className="text-[13px] border-b border-pink-800 pb-2 font-bold ">
                  <div className="flex justify-around items-center">
                    প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুন{" "}
                  <span className="bg-white text-[#89288F] px-2 py-1 rounded font-bold">
                    {number2}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="bg-white text-[#89288F] flex items-center gap-1 px-3 py-1 rounded font-semibold hover:bg-yellow-400 transition"
                  >
                    <FaCopy /> কপি
                  </button> 
                  </div>
                </li>
              </ul>
            </div>
            <div className=" text-white mb-">
              <ul className="list-disc pl-4">
                <li className="text-[13px] border-b border-pink-800 pb-2 font-bold">
                  টাকার পরিমাণঃ 10000
                </li>
              </ul>
            </div>
            <div className=" text-white">
              <ul className="list-disc pl-4">
                <li className="text-[13px] border-b border-pink-800 pb-2 font-bold">
                  নিশ্চিত করতে এখন আপনার BKASH মোবাইল মেনু পিন লিখুন।
                </li>
              </ul>
            </div>
            <div className=" text-white">
              <ul className="list-disc pl-4">
                <li className="text-[11px] border-b border-pink-800 pb-2 font-bold">
                  সবকিছু ঠিক থাকলে, আপনি BKASH থেকে একটি নিশ্চিতকরণ বার্তা পাবেন।
                </li>
              </ul>
            </div>
            <div className=" text-white">
              <ul className="list-disc pl-4">
                <li className="text-[13px] border-b border-pink-800 pb-2 font-bold">
                  খন উপরের বক্সে আপনার <span className="text-yellow-400">Transaction ID</span> দিন এবং নিচের <span className="text-yellow-400">VERIFY</span> বাটনে ক্লিক করুন।
                </li>
              </ul>
            </div>
            
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#89288F] mt-4 text-white font-semibold py-2 rounded-md hover:cursor-pointer transition"
          >
            যাচাই করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default RocketDeposit;
