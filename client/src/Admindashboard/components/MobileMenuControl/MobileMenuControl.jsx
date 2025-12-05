import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MobileMenuControl = () => {
  const [loginBtnColor, setLoginBtnColor] = useState("#4CAF50");
  const [signupBtnColor, setSignupBtnColor] = useState("#2196F3");
  const [buttonFontColor,setButtonFontColor] = useState("#ffffff")
  const [btnFontSize, setBtnFontSize] = useState(16);
  const [pageBgColor, setPageBgColor] = useState("#ffffff");
  const [pageFontSize, setPageFontSize] = useState(16);
  const [isEditing, setIsEditing] = useState(false);
const [loginPageBgColor,setLoginPageBgColor] = useState("#ffffff")
  // Load existing settings
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mobilemenu")
      .then((res) => {
        const data = res.data;
        setLoginBtnColor(data.loginBtnColor || "#4CAF50");
        setSignupBtnColor(data.signupBtnColor || "#2196F3");
        setBtnFontSize(data.btnFontSize || 16);
        setPageBgColor(data.pageBgColor || "#ffffff");
        setPageFontSize(data.pageFontSize || 16);
        setButtonFontColor(data.buttonFontColor || "#ffffff")
        setLoginPageBgColor(data.loginPageBgColor || "#ffffff")
      })
      .catch((err) => console.error(err));
  }, []);

  // Save settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    try {
      await axios.post("http://localhost:5000/api/mobilemenu", {
        loginBtnColor,
        signupBtnColor,
        btnFontSize: Number(btnFontSize),
        pageBgColor,
        pageFontSize: Number(pageFontSize),
        buttonFontColor,
        loginPageBgColor,
      });
      toast.success("Mobile Menu settings saved!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save mobile menu settings!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-yellow-600">
          Mobile Menu Control
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
        {/* Login Button Color */}
        <div>
          <label className="block mb-1 font-medium">Login Button Bg Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={loginBtnColor}
              onChange={(e) => setLoginBtnColor(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={loginBtnColor}
              onChange={(e) => setLoginBtnColor(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Signup Button Color */}
        <div>
          <label className="block mb-1 font-medium">Signup Button Bg Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={signupBtnColor}
              onChange={(e) => setSignupBtnColor(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={signupBtnColor}
              onChange={(e) => setSignupBtnColor(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Login and Signup Button Text Color */}

        <div>
          <label className="block mb-1 font-medium">Login and Signup Button Text-Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={buttonFontColor}
              onChange={(e) => setButtonFontColor(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={buttonFontColor}
              onChange={(e) => setButtonFontColor(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div> 

        {/*Signup Page Background Color */}
        <div>
          <label className="block mb-1 font-medium">Signup Page Background Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={pageBgColor}
              onChange={(e) => setPageBgColor(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={pageBgColor}
              onChange={(e) => setPageBgColor(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Login Page Background Color */}
        <div>
          <label className="block mb-1 font-medium">Login Page Background Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={loginPageBgColor}
              onChange={(e) => setLoginPageBgColor(e.target.value)}
              disabled={!isEditing}
              className="w-16 h-10 rounded border"
            />
            <input
              type="text"
              value={loginPageBgColor}
              onChange={(e) => setLoginPageBgColor(e.target.value)}
              disabled={!isEditing}
              className="border px-2 py-1 rounded w-48"
            />
          </div>
        </div>

        {/* Button Font Size */}
        <div>
          <label className="block mb-1 font-medium">Login and Signup Button Font Size (px):</label>
          <input
            type="number"
            value={btnFontSize}
            onChange={(e) => setBtnFontSize(e.target.value)}
            disabled={!isEditing}
            className="border px-2 py-1 rounded w-20"
          />
        </div>

        {/* Page Font Size */}
        <div>
          <label className="block mb-1 font-medium">Login and Signup Page Font Size (px):</label>
          <input
            type="number"
            value={pageFontSize}
            onChange={(e) => setPageFontSize(e.target.value)}
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

export default MobileMenuControl;
