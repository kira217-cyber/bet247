import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const AdminProfile = () => {
 const {user} = useContext(AuthContext)
 console.log(user._id)
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  // Fetch admin data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admins/${user._id}`);
        setFormData({
          fullname: res.data.fullname,
          username: res.data.username,
          email: res.data.email,
          password: "", // password ফাঁকা রাখা হবে
        });
        console.log(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [user._id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.username) {
      toast.error("Fullname, Email এবং Username আবশ্যক!");
      return;
    }
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      await axios.put(`${import.meta.env.VITE_API_URL}/api/profile/${user._id}`, payload);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Update failed!");
    } 
  };

  return (
    <div className="max-w-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="w-40 font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* User Name */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="w-40 font-medium">User Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="w-40 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <label className="w-40 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep old password"
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
