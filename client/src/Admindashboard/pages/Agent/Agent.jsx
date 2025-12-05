// User.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Agent = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 15;

  // Fetch users based on search and page
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/agents?search=${searchTerm}&page=${currentPage}&limit=${limit}`);
        setUsers(response.data.users);
        setTotal(response.data.total);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [searchTerm, currentPage]);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / limit);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Format date to match the picture (e.g., 9/20/2025, 10:44:29 PM)
  const formatDate = (date) => {
    if (!date) return 'Never';
    const d = new Date(date);
    return `${d.toLocaleDateString('en-US')} ${d.toLocaleTimeString('en-US')}`;
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Agents List</h2>
      
      {/* Search bar with button */}
      <form onSubmit={handleSearch} className="mb-6 flex items-center">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by username, full name or email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>

      {/* Responsive Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">USERNAME</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">FULL NAME</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">EMAIL</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">BALANCE</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">JOINED AT</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">LAST LOGIN AT</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">ROLE</th>
              <th className="py-3 px-4 border-b text-left text-gray-600 font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id || user.username} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 border-b">
                    <span className="bg-green-500 text-white px-2 py-1 rounded mr-2 font-medium">AD</span>
                    {user.username}
                  </td>
                  <td className="py-3 px-4 border-b">{user.fullname}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.balance}</td>
                  <td className="py-3 px-4 border-b">{formatDate(user.joinedAt)}</td>
                  <td className="py-3 px-4 border-b">
                    {user.lastLogin === 'Never' ? 'Never' : formatDate(user.lastLogin)}
                  </td>
                  <td className="py-3 px-4 border-b">{user.role}</td>
                  <td className="py-3 px-4 border-b">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Agent;