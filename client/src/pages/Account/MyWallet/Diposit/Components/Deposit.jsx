import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";

const DepositPage = () => {
  const { id } = useParams(); // payment method ID
  const { state } = useLocation(); // data from DepositForm
  const [transactionId, setTransactionId] = useState("");
  const [number, setNumber] = useState("");
  const [paymentSettings, setPaymentSettings] = useState(null);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/deposit/method/${id}`
        );
        setPaymentSettings(res.data);
      } catch (err) {
        console.error("Error fetching payment settings:", err);
        toast.error("পেমেন্ট সেটিংস লোড করতে ব্যর্থ!");
      }
    };
    fetchPaymentSettings();
  }, [id]);

  if (!paymentSettings)
    return <div className="text-center mt-10 text-white">লোড হচ্ছে...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = loginUser?._id;
    if (!userId) {
      toast.error("ইউজার লগইন করুন!");
      return;
    }

    // Safely parse amount to avoid NaN
    const amount = parseFloat(state.amount) || 0;
    if (isNaN(amount) || amount < 0) {
      toast.error("অবৈধ অ্যামাউন্ট। দয়া করে সঠিক মান দিন।");
      return;
    }

    // Calculate bonus and total (using state data if available)
    const bonus = state.promotion ? (amount * state.promotion.bonusPercent) / 100 : 0;
    const total = amount + bonus;

    // Use state values for pbuAmount, bonusPBU, totalPBU if provided
    const pbuAmount = parseFloat(state.pbuAmount) || (amount / 100); // 1 PBU = 100 BDT
    const bonusPBU = parseFloat(state.bonusPBU) || bonus / 100; // Convert bonus BDT to PBU
    const totalPBU = parseFloat(state.totalPBU) || (pbuAmount + bonusPBU);

    // Validate calculations
    if (isNaN(pbuAmount) || isNaN(bonusPBU) || isNaN(totalPBU)) {
      toast.error("ক্যালকুলেশন ত্রুটি। দয়া করে পুনরায় চেষ্টা করুন।");
      return;
    }

    console.log("Submitting:", { userId, transactionId, number, paymentMethod: id, paymentType: state.paymentType, amount, currency: state.currency, promotion: state.promotion, pbuAmount, bonusPBU, totalPBU }); // Debug log

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/deposit/submit`, {
        userId,
        transactionId,
        number,
        paymentMethod: id,
        paymentType: state.paymentType,
        amount, // BDT
        currency: state.currency || "BDT", // Ensure BDT
        promotion: state.promotion,
        pbuAmount, // PBU converted amount
        bonusPBU, // PBU bonus
        totalPBU, // Total PBU
      });
      toast.success("লেনদেন সফলভাবে জমা দেওয়া হয়েছে!");
      setTransactionId("");
      setNumber("");
      navigate('/profile/transaction-records');
    } catch (err) {
      console.error("Error submitting transaction:", err.response?.data || err.message);
      toast.error(`লেনদেন জমা দিতে ব্যর্থ! ${err.response?.data?.error || "অজানা ত্রুটি।"}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentSettings.transactionNumber);
    toast.success("নম্বরটি কপি হয়েছে!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: paymentSettings.bgColor || "#f7f8fc" }}
    >
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg border border-gray-100">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pt-6">
          <img
            src={paymentSettings.logo}
            alt={`${id} Logo`}
            className="w-32 mb-2"
          />
          <p className="text-gray-600 text-sm">{paymentSettings.companyName}</p>
        </div>

        {/* Transaction Info */}
        <div className="flex justify-between items-center bg-[#f9fafb] rounded-xl border border-gray-200 mx-5 mt-6 px-4 py-3">
          <div>
            <p className="text-sm text-gray-600">লেনদেন নম্বর:</p>
            <p className="text-xs text-gray-800 mt-1 font-mono">
              {paymentSettings.transactionId}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: paymentSettings.formBgColor || "#f7f8fc" }}>
              ৳ {state?.amount || 0}
            </p>
          </div>
        </div>

        {/* Deposit Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div
            className="mt-6 px-4 py-5 rounded-xl text-white space-y-5"
            style={{
              backgroundColor: paymentSettings.formBgColor || "#e2136e",
            }}
          >
            {/* Transaction ID */}
            <div>
              <label className="block font-semibold mb-2 text-center text-sm">
                {paymentSettings.transactionIdLabel || "ট্রানজেকশন আইডি দিন"}
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
                {paymentSettings.transactionIdHint ||
                  "দয়া করে আপনার ট্রানজেকশন আইডি দিন"}
              </p>
            </div>

            {/* Number */}
            <div>
              <label className="block font-semibold mb-2 text-center text-sm">
                {paymentSettings.numberLabel || "লেনদেন নম্বর লিখুন"}
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
                {paymentSettings.numberHint ||
                  "দয়া করে আপনার লেনদেন নম্বর দিন"}
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              {paymentSettings.instructions.map((instruction, index) => (
                <div key={index} className="text-white">
                  <ul className="list-disc pl-4">
                    <li className="text-[13px] border-b border-pink-800 pb-2 font-bold">
                      <div className="flex items-start gap-2">
                        <div className="flex-1">{instruction.text}</div>
                        {instruction.isNumber && (
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="bg-white px-2 py-1 rounded font-bold whitespace-nowrap" style={{ color: paymentSettings.formBgColor || "#f7f8fc" }}>
                              {paymentSettings.transactionNumber}
                            </span>
                            <button
                              type="button"
                              onClick={copyToClipboard}
                              className="bg-yellow-300 text-pink-700 flex items-center gap-1 px-2 py-1 rounded font-semibold hover:bg-yellow-400 transition whitespace-nowrap"
                              title="কপি করুন"
                            >
                              <FaCopy className="text-sm" /> কপি
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 text-white font-semibold py-2 rounded-md hover:cursor-pointer transition"
            style={{
              backgroundColor: paymentSettings.formBgColor || "#e2136e",
            }}
          >
            {paymentSettings.submitButtonText || "যাচাই করুন"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositPage;