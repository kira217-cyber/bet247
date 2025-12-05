import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DepositHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/deposit/history`, {
        params: { search, page, limit },
      });
      setTransactions(res.data.transactions);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching transaction history:", err);
      toast.error("Failed to load transaction history!");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, search]);

  const handleSearch = () => {
    setSearch(tempSearch);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 text-black mt-10 shadow-lg rounded-lg">
      <h2 className="font-bold text-2xl mb-4 text-yellow-400 border-b border-yellow-400 pb-2">
        Deposit Transaction Full History
      </h2>

      {/* Search Bar */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by Transaction ID"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          className="flex-1 border border-gray-700 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-black px-5 py-2 rounded hover:bg-yellow-600 transition"
        >
          Search
        </button>
      </div>

      {/* Table */}
      {transactions.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto border border-yellow-400 rounded-lg shadow-md">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-yellow-500 text-black uppercase text-xs">
                <th className="p-3 border border-yellow-600">Username</th>
                <th className="p-3 border border-yellow-600">Payment Method</th>
                <th className="p-3 border border-yellow-600">Amount</th>
                <th className="p-3 border border-yellow-600">Bonus</th>
                <th className="p-3 border border-yellow-600">Total</th>
                <th className="p-3 border border-yellow-600">Status</th>
                <th className="p-3 border border-yellow-600">Transaction ID</th>
                <th className="p-3 border border-yellow-600">Number</th>
                <th className="p-3 border border-yellow-600">Submitted At</th>
                <th className="p-3 border border-yellow-600">Processed At</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx._id}
                  className={`${
                    index % 2 === 0 ? " " : ""
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-3 border border-gray-700">{tx.user.username}</td>
                  <td className="p-3 border border-gray-700">{tx.paymentMethod}</td>
                  <td className="p-3 border border-gray-700">{tx.amount}</td>
                  <td className="p-3 border border-gray-700">{tx.bonus}</td>
                  <td className="p-3 border border-gray-700">{tx.total}</td>
                  <td
                    className={`p-3 border border-gray-700 font-semibold ${
                      tx.status === "success"
                        ? "text-green-400"
                        : tx.status === "Pending"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.status}
                  </td>
                  <td className="p-3 border border-gray-700">{tx.transactionId}</td>
                  <td className="p-3 border border-gray-700">{tx.number}</td>
                  <td className="p-3 border border-gray-700">
                    {new Date(tx.submittedAt).toLocaleString()}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {tx.processedAt ? new Date(tx.processedAt).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-400">
          Total Transactions: {total} | Page: {page} / {totalPages}
        </p>
        <div>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50 hover:bg-gray-500"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositHistory;
