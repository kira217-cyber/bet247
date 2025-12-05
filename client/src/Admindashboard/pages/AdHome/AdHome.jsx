// AdHome.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import { TiUserAdd } from "react-icons/ti";
import { Link } from "react-router";
import { toast } from "react-toastify";

const AdHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const { user } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [total, setTotal] = useState(0); // Added to track total admins
  const limit = 15;

  // বাইরে ক্লিক করলে dropdown বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allRoles = [
    "User",
    "Sub Agent",
    "Agent",
    "Master",
    "Sub Admin",
    "Mother Admin",
  ];

  const roleRoutes = {
    "Mother Admin": "/admin-dashboard/modify-profile/",
    "Sub Admin": "/sub-admin-dashboard/modify-profile/",
    Master: "/master-dashboard/modify-profile/",
    Agent: "/agent-dashboard/modify-profile/",
    "Sub Agent": "/sub-agent-dashboard/modify-profile/",
  };

  // role অনুযায়ী ফিল্টার
  const getFilteredRoles = (role) => {
    if (role === "Mother Admin") {
      return allRoles;
    }
    if (role === "Sub Admin") {
      return ["Sub Admin", "Master", "Agent", "Sub Agent", "User"];
    }
    if (role === "Master") {
      return ["Master", "Agent", "Sub Agent", "User"];
    }
    if (role === "Agent") {
      return ["Agent", "Sub Agent", "User"];
    }
    if (role === "Sub Agent") {
      return ["Sub Agent", "User"];
    }
    if (role === "User") {
      return ["User"];
    }
    return [];
  };

  const filteredRoles = getFilteredRoles(user.role);
  const userRoute = roleRoutes[user.role] || null;
  const [selectedRole, setSelectedRole] = useState(filteredRoles[0] || "");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: selectedRole,
    password: "",
    confirmPassword: "",
  });

  // ✅ Fetch admins from API with pagination and search
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/admins?search=${searchInput}&page=${currentPage}&limit=${limit}`
      );
      const data = await res.json();
      setAdmins(data.admins);
      setTotal(data.total); // Set total from backend response
    } catch (err) {
      console.error("Error fetching admins", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, [searchInput, currentPage]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Create new admin
  const handleCreate = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newAdmin = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullname: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      username: formData.username,
      role: selectedRole,
      password: formData.password,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Admin created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          role: "",
          password: "",
          confirmPassword: "",
        });
        setIsOpen(false);
        fetchAdmins(); // refresh list
      } else {
        toast.error("Failed to create admin: " + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating admin");
    }
  };

  const handleBan = async (id) => {
    if (user.role !== "Mother Admin") {
      alert("Only Mother Admin can perform this action!");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admins/${id}/ban`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: user.role }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin._id === id ? { ...admin, status: "Banned" } : admin
          )
        );
      } else toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // Allowed role hierarchy (frontend check)
  const roleHierarchy = {
    "Mother Admin": ["Sub Admin", "Master", "Agent", "Sub Agent", "User"],
    "Sub Admin": ["Master", "Agent", "Sub Agent", "User"],
    Master: ["Agent", "Sub Agent", "User"],
    Agent: ["Sub Agent", "User"],
    "Sub Agent": ["User"],
    User: [],
  };
  // ✅ Handle Activate / Deactivate
  const handleStatusChange = async (id, action, targetRole) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admins/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            requesterRole: user.role,
            targetRole,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin._id === id
              ? {
                  ...admin,
                  status: action === "Activate" ? "Activated" : "Deactivated",
                }
              : admin
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchAdmins();
  };

  // Handle pagination
  const totalPages = Math.ceil(total / limit);
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {/* start */}
      <div className="p-4 space-y-6 ">
        {" "}
        {/* Top Search & Actions */}{" "}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {" "}
          {/* Left Side */}{" "}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {" "}
            <div className="flex items-center gap-2">
              {" "}
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Find Member"
                  className="input input-bordered w-60"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />{" "}
                <button type="submit" className="btn bg-yellow-600 text-white">
                  Search
                </button>{" "}
              </form>
            </div>{" "}
            <div className="flex items-center gap-2">
              {" "}
              <span className="font-medium">Admin List</span>{" "}
              <select className="select select-bordered w-32">
                {" "}
                <option>Active</option> <option>Inactive</option>{" "}
                <option>Pending</option>{" "}
              </select>{" "}
            </div>{" "}
          </div>{" "}
          {/* Right Side */}{" "}
          <div className="flex items-center gap-3">
            {" "}
            <span className="font-medium">Total records: {total}</span>{" "}
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-outline flex items-center gap-2"
            >
              {" "}
              <FaUsers /> Add Client{" "}
            </button>{" "}
            <button onClick={fetchAdmins} className="btn btn-outline">
              {" "}
              <IoReload />{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        {/* Stats Cards */}{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {" "}
          <div className="bg-black text-center rounded-md p-4">
            {" "}
            <h3 className="text-white font-semibold">Total Balance</h3>{" "}
            <div className="bg-yellow-600 text-white rounded-md py-1 mt-2">
              {" "}
              USD (0.00){" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-black text-center rounded-md p-4">
            {" "}
            <h3 className="text-white font-semibold">Total Client</h3>{" "}
            <div className="bg-yellow-600 text-white rounded-md py-1 mt-2">
              {" "}
              0{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-black text-center rounded-md p-4">
            {" "}
            <h3 className="text-white font-semibold">
              Total Active Games
            </h3>{" "}
            <div className="bg-yellow-600 text-white rounded-md py-1 mt-2">
              {" "}
              0{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-black text-center rounded-md p-4">
            {" "}
            <h3 className="text-white font-semibold">Total Deposit</h3>{" "}
            <div className="bg-yellow-600 text-white rounded-md py-1 mt-2">
              {" "}
              0{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-black text-center rounded-md p-4">
            {" "}
            <h3 className="text-white font-semibold">
              Total Self Withdrawal
            </h3>{" "}
            <div className="bg-yellow-600 text-white rounded-md py-1 mt-2">
              {" "}
              USD (0.00){" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-md p-4 ">
        <table className="table w-full border-collapse">
          <thead className="bg-yellow-500 text-gray-800">
            <tr>
              <th className="border px-4 py-2">USERNAME</th>
              <th className="border px-4 py-2">FULL NAME</th>
              <th className="border px-4 py-2">EMAIL</th>
              <th className="border px-4 py-2">BALANCE</th>
              <th className="border px-4 py-2">JOINED AT</th>
              <th className="border px-4 py-2">LAST LOGIN AT</th>
              <th className="border px-4 py-2">ROLE</th>
              <th className="border px-4 py-2">STATUS</th>
              <th className="border px-4 py-2">ACTIONS</th>
            </tr>
          </thead>

          <tbody ref={menuRef}>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : admins.length > 0 ? (
              admins.map(
                (
                  row,
                  idx // ✅ index declare করা হলো এখানে
                ) => (
                  <tr key={row._id} className="text-center">
                    <td className="border px-4 py-2">
                      <div className="flex items-center gap-2 justify-start">
                        <span className="px-2 py-1 bg-green-500 text-white rounded-sm">
                          AD
                        </span>
                        <span className="text-blue-600 text-nowrap hover:underline">
                          {userRoute ? (
                            <Link to={`${userRoute}${row._id}`}>
                              {row.username}
                            </Link>
                          ) : (
                            <span className="text-gray-400 cursor-not-allowed">
                              {row.username}
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-nowrap">
                      {row.fullname}
                    </td>
                    <td className="border px-4 py-2 text-nowrap">
                      <span className="text-red-600">{row.email}</span>
                    </td>
                    <td className="border px-4 py-2">{row.balance}</td>
                    <td className="border px-4 py-2 text-nowrap">
                      {new Date(row.joinedAt).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2 text-nowrap">
                      {row.lastLogin}
                    </td>
                    <td className="border px-4 py-2 text-nowrap">{row.role}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded flex items-center justify-center gap-1
    ${
      row.status === "Active"
        ? "bg-green-100 text-green-700"
        : row.status === "deactive"
        ? "bg-red-100 text-red-700"
        : row.status === "banned"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700"
    }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full
      ${
        row.status === "Activated"
          ? "bg-green-600"
          : row.status === "Deactivated"
          ? "bg-red-600"
          : row.status === "Banned"
          ? "bg-yellow-600"
          : "bg-gray-600"
      }`}
                        ></span>
                        {row.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="border px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <button className="btn btn-xs bg-gray-200">BS</button>
                        <div className="relative inline-block text-left">
                          <button
                            className="btn btn-xs bg-gray-200 p-2 rounded"
                            onClick={() =>
                              setOpenIndex(openIndex === idx ? null : idx)
                            }
                          >
                            <FaCog />
                          </button>

                          {/* Dropdown */}
                          {openIndex === idx && (
                            <div className="absolute mt-2 right-0 w-40 bg-white border rounded shadow-lg z-10">
                              {/* ✅ Active/Deactivate */}
                              {roleHierarchy[user.role]?.includes(row.role) ||
                              user.role === "Mother Admin" ? (
                                row.status === "Activated" ? (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        row._id,
                                        "Deactivate",
                                        row.role
                                      )
                                    }
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                  >
                                    Deactivate
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleStatusChange(
                                        row._id,
                                        "Activate",
                                        row.role
                                      )
                                    }
                                    className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-100"
                                  >
                                    Activate
                                  </button>
                                )
                              ) : null}

                              {/* ✅ Ban only Mother Admin */}
                              {user.role === "Mother Admin" && (
                                <button
                                  onClick={() => handleBan(row._id)}
                                  className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-100"
                                >
                                  Ban User
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <button className="btn btn-xs bg-gray-200">
                          <TiUserAdd />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="9" className="text-center p-4">
                  No admins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-center items-center gap-4 mt-4 mb-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="btn btn-outline"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-md shadow-lg w-full max-w-sm p-2">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-lg font-semibold">Create user</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 font-bold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="mb-2 font-bold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <label className="mb-2 font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full"
              />

              <label className="mb-2 font-bold">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="input input-bordered w-full"
              />

              <label className="mb-2 font-bold">Select a Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="select selected-border w-full p-2 rounded"
              >
                {filteredRoles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <label className="mb-2 font-bold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered w-full"
              />

              <label className="mb-2 font-bold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="input input-bordered w-full"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end px-4 py-2">
              <button
                onClick={handleCreate}
                className="btn bg-yellow-700 hover:bg-yellow-800 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdHome;
