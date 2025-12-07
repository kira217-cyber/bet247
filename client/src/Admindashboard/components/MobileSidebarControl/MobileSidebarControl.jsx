import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MobileSideBarControl = () => {
  const [gradientDirection, setGradientDirection] = useState("to-r");
  const [gradientFrom, setGradientFrom] = useState("#706D6D");
  const [gradientTo, setGradientTo] = useState("#000000");
  const [sideTextColor, setSideTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(14);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/mobile-sidebar-style`)
      .then((res) => {
        const data = res.data;
        setGradientDirection(data.gradientDirection || "to-r");
        setGradientFrom(data.gradientFrom || "#706D6D");
        setGradientTo(data.gradientTo || "#000000");
        setSideTextColor(data.sideTextColor || "#ffffff");
        setFontSize(data.fontSize || 14);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/mobile-sidebar-style`, {
        gradientDirection,
        gradientFrom,
        gradientTo,
        sideTextColor,
        fontSize: Number(fontSize),
      });
      toast.success("Sidebar style saved!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save sidebar style!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-600">
          Mobile Sidebar Settings 
        </h2>
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
        {/* Gradient Direction */}
        <div>
          <label className="block mb-1 font-medium">Gradient Direction:</label>
          <select
            value={gradientDirection}
            onChange={(e) => setGradientDirection(e.target.value)}
            disabled={!isEditing}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="to-r">Left to Right</option>
            <option value="to-l">Right to Left</option>
            <option value="to-t">Bottom to Top</option>
            <option value="to-b">Top to Bottom</option>
          </select>
        </div>

        {/* Gradient From Color */}
        <div>
          <label className="block mb-1 font-medium">Gradient From Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={gradientFrom}
              onChange={(e) => setGradientFrom(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={gradientFrom}
              onChange={(e) => setGradientFrom(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Gradient To Color */}
        <div>
          <label className="block mb-1 font-medium">Gradient To Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={gradientTo}
              onChange={(e) => setGradientTo(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={gradientTo}
              onChange={(e) => setGradientTo(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="block mb-1 font-medium">Text Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={sideTextColor}
              onChange={(e) => setSideTextColor(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={sideTextColor}
              onChange={(e) => setSideTextColor(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block mb-1 font-medium">Font Size (px):</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
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

export default MobileSideBarControl;
