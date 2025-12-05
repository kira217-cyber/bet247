import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const MoneyTransfer = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [actionType, setActionType] = useState("add");
  const { user } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-users`,
        { params: { search, page: currentPage, limit } }
      );
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, currentPage]);

  const handleTransaction = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/transaction`, {
        actorId: user._id,
        toUserId: selectedUser._id,
        amount,
        type: actionType,
      });

      toast.success(res.data.message);
      setModalOpen(false);
      setAmount("");
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Transaction failed");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 mt-10 ">
      <h1 className="text-xl font-bold mb-4">💸 Money Transfer</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by username, fullname, email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Table */}
      <table className="w-full border overflow-x-auto">
        <thead className="bg-yellow-500">
          <tr>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Balance</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2 text-center">{u.fullname}</td>
              <td className="border p-2 text-center">{u.username}</td>
              <td className="border p-2 text-center">{u.email}</td>
              <td className="border p-2 text-center">{u.role}</td>
              <td className="border p-2 text-center">{u.balance}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedUser(u);
                    setActionType("add");
                    setModalOpen(true);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add Money
                </button>
                {user.role === "Mother Admin" && (
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setActionType("minus");
                      setModalOpen(true);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Minus Money
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {actionType === "add" ? "Add Money" : "Minus Money"} for{" "}
              {selectedUser.fullname}
            </h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleTransaction}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoneyTransfer;
