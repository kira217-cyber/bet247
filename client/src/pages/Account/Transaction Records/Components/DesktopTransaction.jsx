import React, { useState, useEffect, useContext } from "react";
import { FaCheck, FaWallet } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

const DesktopTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { loginUser,userBalance } = useContext(AuthContext);

  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("Today");

  // === Filter buttons ===
  const platforms = ["All", "Deposit", "Withdraw"];
  const statuses = ["All", "Pending", "Approved", "Rejected"];
  const dates = ["Today", "Yesterday", "Last 7 days"];

  // === Fetch transactions from backend ===
  useEffect(() => {
    const fetchTransactions = async () => {
      const userId = loginUser?._id;
      if (!userId) {
        toast.error("Please login first!");
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/deposit/transactions?userId=${userId}`
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        toast.error("Failed to load transactions!");
      }
    };
    fetchTransactions();
  }, [loginUser]);

  // === Filter Logic ===
  const filteredTransactions = transactions.filter((tx) => {
    const matchPlatform =
      selectedPlatform === "All" || tx.paymentMethod === selectedPlatform;
    const matchStatus =
      selectedStatus === "All" ||
      tx.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchPlatform && matchStatus;
  });

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
      <div className="flex items-center m-6 bg-gray-700 p-4 rounded-lg">
        <div className="w-1/2">
          <p className="text-white">Main Wallet</p>
          <p className="text-green-400 text-xl font-bold">৳ {userBalance || 0}</p>
        </div>
        <div className="w-1/2">
          <p className="text-white">Security Level</p>
          <p className="text-green-400 font-bold">Safe</p>
        </div>
      </div>

      {/* Transaction Filters */}
      <div className="m-6">
        <div className="hidden md:block bg-gray-700 text-white p-4 rounded-md shadow-lg">
          <div className="mb-4 border-b border-dashed border-yellow-500 pb-2">
            <h2 className="text-yellow-400 font-semibold">
              <span className="text-2xl">|</span> Transaction Records
            </h2>
          </div>

          {/* Platform Filter */}
          <div className="mb-6">
            <p className="text-sm mb-2">Payment Type</p>
            <div className="grid grid-cols-8 gap-2">
              {platforms.map((p) =>
                renderButton(p, selectedPlatform, setSelectedPlatform)
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="mb-6">
            <p className="text-sm mb-2">Status</p>
            <div className="grid grid-cols-8 gap-2">
              {statuses.map((s) =>
                renderButton(s, selectedStatus, setSelectedStatus)
              )}
            </div>
          </div>

          {/* Date Filter */}
          <div className="mb-6">
            <p className="text-sm mb-2">Date</p>
            <div className="grid grid-cols-8 gap-2">
              {dates.map((d) => renderButton(d, selectedDate, setSelectedDate))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="m-6">
        <div className="hidden md:block bg-gray-700 text-white p-5 rounded-md shadow-lg mt-4">
          <div className="border border-blue-600 rounded">
            {/* Table Header */}
            <div className="grid grid-cols-8 bg-blue-600 text-white text-sm font-semibold">
              <div className="p-2 border-r border-blue-400 text-center">#</div>
              <div className="p-2 border-r border-blue-400 text-center">Payment Method</div>
              <div className="p-2 border-r border-blue-400 text-center">Total BDT Amount</div>
              <div className="p-2 border-r border-blue-400 text-center">PBU Amount</div>
              <div className="p-2 border-r border-blue-400 text-center">PBU Bonus</div>
              <div className="p-2 border-r border-blue-400 text-center">PBU Total</div>
              <div className="p-2 border-r border-blue-400 text-center">Status</div>
              <div className="p-2 text-center">Date</div>
            </div>

            {/* Table Body */}
            {filteredTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaWallet className="text-6xl text-gray-400 mb-2" />
                <p className="text-gray-400">No Transactions Found</p>
              </div>
            ) : (
              filteredTransactions.map((tx, index) => (
                <div
                  key={tx._id}
                  className="grid grid-cols-8 text-center text-sm border-t border-blue-600 hover:bg-gray-600 transition"
                >
                  <div className="p-2 border-r border-blue-400">{index + 1}</div>
                  <div className="p-2 border-r border-blue-400">
                    {tx.paymentMethod}
                  </div>
                  <div className="p-2 border-r border-blue-400">{tx.amount}</div>
                  <div className="p-2 border-r border-blue-400">{tx.pbuAmount}</div>
                  <div className="p-2 border-r border-blue-400">{tx.bonusPBU}</div>
                  <div className="p-2 border-r border-blue-400">{tx.totalPBU}</div>
                  <div
                    className={`p-2 border-r border-blue-400 ${
                      tx.status === "Approved"
                        ? "text-green-400"
                        : tx.status === "Rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {tx.status}
                  </div>
                  <div className="p-2">
                    {new Date(tx.submittedAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopTransaction;
