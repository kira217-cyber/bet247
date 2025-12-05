import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CheckUserPayment = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/deposit/pending`
        );
        setPendingTransactions(res.data);
      } catch (err) {
        console.error("Error fetching pending transactions:", err);
        toast.error("Failed to load pending transactions!");
      }
    };
    fetchPending();
  }, []);

  const handleConfirm = async (txId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/deposit/confirm/${txId}`
      );
      toast.success("Transaction confirmed successfully!");
      setPendingTransactions((prev) => prev.filter((tx) => tx._id !== txId));
    } catch (err) {
      toast.error("Failed to confirm transaction!");
    }
  };

  const handleCancel = async (txId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/deposit/cancel/${txId}`
      );
      toast.success("Transaction canceled successfully!");
      setPendingTransactions((prev) => prev.filter((tx) => tx._id !== txId));
    } catch (err) {
      toast.error("Failed to cancel transaction!");
    }
  };

  return (
    <div className="p-6 mt-10 shadow-lg ">
      <h2 className="font-bold text-2xl mb-4 text-yellow-400 border-b border-yellow-400 pb-2">
        Pending User Payments
      </h2>

      {pendingTransactions.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          No pending transactions found.
        </p>
      ) : (
        <div className="overflow-x-auto border border-yellow-400 rounded-lg ">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-yellow-500 text-black uppercase text-xs">
                <th className="p-3 border border-yellow-600">Username</th>
                <th className="p-3 border border-yellow-600">Payment Method</th>
                <th className="p-3 border border-yellow-600">BDT Amount</th>
                <th className="p-3 border border-yellow-600">PBU Amount</th>
                <th className="p-3 border border-yellow-600">Bonus</th>
                <th className="p-3 border border-yellow-600">Total</th>
                <th className="p-3 border border-yellow-600">Transaction ID</th>
                <th className="p-3 border border-yellow-600">Number</th>
                <th className="p-3 border border-yellow-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingTransactions.map((tx, index) => (
                <tr
                  key={tx._id}
                  className={`${
                    index % 2 === 0 ? " " : ""
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-3 border border-gray-700">
                    {tx.user.username}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {tx.paymentMethod}
                  </td>
                  <td className="p-3 border border-gray-700">{tx.amount}</td>
                  <td className="p-3 border border-gray-700">{tx.pbuAmount}</td>
                  <td className="p-3 border border-gray-700">{tx.bonusPBU}</td>
                  <td className="p-3 border border-gray-700">{tx.totalPBU}</td>
                  <td className="p-3 border border-gray-700">
                    {tx.transactionId}
                  </td>
                  <td className="p-3 border border-gray-700">{tx.number}</td>
                  <td className="p-3 border border-gray-700 text-center">
                    <button
                      onClick={() => handleConfirm(tx._id)}
                      className="bg-green-500 hover:cursor-pointer hover:bg-green-600 text-white px-3 py-1 rounded mr-2 transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(tx._id)}
                      className="bg-red-500 hover:cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckUserPayment;
