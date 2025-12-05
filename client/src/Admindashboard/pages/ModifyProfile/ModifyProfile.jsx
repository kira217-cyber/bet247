import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import api from '../../../components/Api/Api';

const ModifyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    username: '',
    role: '',
    status: '',
    password: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [targetRole, setTargetRole] = useState('');
  const admin = JSON.parse(localStorage.getItem("admin")); // লগইনকৃত admin
  console.log(admin)

  // ডাটাবেস থেকে user ডেটা লোড
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/api/admins/${id}`)
      .then(res => {
        setForm({
          fullname: res.data.fullname || '',
          email: res.data.email || '',
          username: res.data.username || '',
          role: res.data.role || '',
          status: res.data.status || '',
          password: ''
        });
        setTargetRole(res.data.role);
      })
      .catch(() => toast.error("User load error!"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      await api.put(`/api/admins/${id}`, payload);
      toast.success("Profile updated successfully!");
      navigate('/admin-dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  // Role hierarchy check
  const hierarchy = ["Mother Admin", "Sub Admin", "Master", "Agent", "Sub Agent", "User"];
  const editorRank = hierarchy.indexOf(admin.role);
  const targetRank = hierarchy.indexOf(targetRole);
  const canModify = editorRank < targetRank; // শুধু নিচের role পরিবর্তন করা যাবে

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Modify Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">User Name</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            value={form.role}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Activated">Activated</option>
            <option value="Deactivated">Deactivated</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Leave blank to keep current"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving || !canModify}
            className={`px-6 py-2 rounded font-medium ${
              canModify
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {saving ? "Saving..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyProfile;
