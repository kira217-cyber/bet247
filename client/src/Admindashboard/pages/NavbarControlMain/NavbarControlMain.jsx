import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

const NavbarControlMain = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    gameId: "",
    liveCount: "",
  });

  // Fetch all navbar items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/navbar-items`);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load navbar items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({ name: "", url: "", gameId: "", liveCount: "" });
    setEditingItem(null);
  };

  // Open modal for add/edit
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        url: item.url,
        gameId: item.gameId || "",
        liveCount: item.liveCount || "",
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.url.trim()) {
      toast.warn("Navbar Name and URL are required!");
      return;
    }

    try {
      if (editingItem) {
        // Update
        const res = await axios.put(
          `${API}/api/navbar-items/${editingItem._id}`,
          {
            name: formData.name,
            url: formData.url,
            gameId: formData.gameId || null,
            liveCount: parseInt(formData.liveCount) || 0,
          }
        );
        setItems(items.map((i) => (i._id === editingItem._id ? res.data : i)));
        toast.success("Navbar item updated successfully!");
      } else {
        // Add new
        const res = await axios.post(`${API}/api/navbar-items`, {
          name: formData.name,
          url: formData.url,
          gameId: formData.gameId || null,
          liveCount: parseInt(formData.liveCount) || 0,
        });
        setItems([...items, res.data]);
        toast.success("Navbar item added successfully!");
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed! Please try again.");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API}/api/navbar-items/${id}`);
      setItems(items.filter((i) => i._id !== id));
      toast.success("Navbar item deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Navbar Control Panel
          </h1>
          <button
            onClick={() => openModal()}
            className="flex items-center cursor-pointer gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition shadow-md"
          >
            <Plus size={20} />
            Add Navbar Item
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-400"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">
              No navbar items yet. Add your first one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">URL:</span> {item.url}
                  </p>
                  {item.gameId && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Game ID:</span>{" "}
                      {item.gameId}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Live: {item.liveCount || 0}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-lg transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingItem ? "Edit Navbar Item" : "Add New Navbar Item"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Navbar Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="e.g., Live Casino"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Navbar URL / Path <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="e.g., /live-casino"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Game ID
                </label>
                <input
                  type="text"
                  value={formData.gameId}
                  onChange={(e) =>
                    setFormData({ ...formData, gameId: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="e.g., casino123"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Game Live Count (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.liveCount}
                  onChange={(e) =>
                    setFormData({ ...formData, liveCount: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="e.g., 45"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border cursor-pointer border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 cursor-pointer hover:bg-yellow-500 text-black font-semibold rounded-lg transition shadow-md"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarControlMain;