import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`);
      setHistory(res.data);
    } catch (err) {
      toast.error("Error fetching history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-6 mt-10 overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">📜 Payment History</h1>
      <table className="w-full border ">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h._id}>
              <td className="border p-2">{h.from.username} ({h.from.role})</td>
              <td className="border p-2">{h.to.username} ({h.to.role})</td>
              <td className="border p-2">{h.amount}</td>
              <td className="border p-2 capitalize">{h.type}</td>
              <td className="border p-2">{new Date(h.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
