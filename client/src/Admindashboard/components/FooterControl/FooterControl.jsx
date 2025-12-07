import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FooterControl = () => {
  const [footerTextColor, setFooterTextColor] = useState("#ffffff");
  const [footerFontSize, setFooterFontSize] = useState(14);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/footer`)
      .then((res) => {
        const data = res.data;
        setFooterTextColor(data.footerTextColor || "#ffffff");
        setFooterFontSize(data.footerFontSize || 14);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/footer`, {
        footerTextColor,
        footerFontSize: Number(footerFontSize),
      });
      toast.success("Footer settings saved!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save footer settings!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-600">Footer Control</h2>
        <button
          onClick={() => setIsEditing(true)}
          className={`px-3 py-1 rounded text-white font-medium ${
            isEditing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={isEditing}
        >
          Edit
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Footer Text Color */}
        <div>
          <label className="block mb-1 font-medium">Footer Text Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={footerTextColor}
              onChange={(e) => setFooterTextColor(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={footerTextColor}
              onChange={(e) => setFooterTextColor(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Footer Font Size */}
        <div>
          <label className="block mb-1 font-medium">Footer Font Size (px):</label>
          <input
            type="number"
            value={footerFontSize}
            onChange={(e) => setFooterFontSize(e.target.value)}
            disabled={!isEditing}
            className="border px-2 py-1 rounded w-20"
          />
        </div>

        {/* Apply Button */}
        <button
          type="submit"
          className={`w-full py-2 rounded text-white font-semibold mt-2 ${
            isEditing
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEditing}
        >
          Apply Styles
        </button>
      </form>
    </div>
  );
};

export default FooterControl;
