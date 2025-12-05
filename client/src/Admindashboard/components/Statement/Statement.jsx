import React, { useState } from "react";

const Statement = () => {
  // Example data, আপনার backend থেকে fetch করা যাবে
  const statementData = [
    {
      date: "2025-09-28 10:00",
      depositFrom: 1000,
      depositTo: 500,
      withdrawBy: 200,
      withdrawFrom: 100,
      balance: 1200,
      remark: "Test remark",
      fromTo: "Upline/Downline",
    },
    // আরো data যোগ করুন
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination
  const totalPages = Math.ceil(statementData.length / itemsPerPage);
  const currentItems = statementData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleGo = () => {
    const page = prompt(`Enter page number (1-${totalPages})`);
    const pageNum = Number(page);
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  return (
    <div className="p-4 md:p-10 bg-gray-50">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Account Statement</h1>

      <div className="overflow-x-auto">
        <table className="border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date/Time</th>
              <th className="px-4 py-2 border">Deposit from Upline</th>
              <th className="px-4 py-2 border">Deposit to Downline</th>
              <th className="px-4 py-2 border">Withdraw by Upline</th>
              <th className="px-4 py-2 border">Withdraw from Downline</th>
              <th className="px-4 py-2 border">Balance</th>
              <th className="px-4 py-2 border">Remark</th>
              <th className="px-4 py-2 border">From/To</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => (
              <tr key={idx} className="text-center hover:bg-gray-50">
                <td className="px-2 py-1 border">{item.date}</td>
                <td className="px-2 py-1 border">{item.depositFrom}</td>
                <td className="px-2 py-1 border">{item.depositTo}</td>
                <td className="px-2 py-1 border">{item.withdrawBy}</td>
                <td className="px-2 py-1 border">{item.withdrawFrom}</td>
                <td className="px-2 py-1 border">{item.balance}</td>
                <td className="px-2 py-1 border">{item.remark}</td>
                <td className="px-2 py-1 border">{item.fromTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={handlePrev}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <div className="px-3 py-1 bg-yellow-400 rounded">{currentPage}</div>
        <button
          onClick={handleNext}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
        <button
          onClick={handleGo}
          className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Statement;
