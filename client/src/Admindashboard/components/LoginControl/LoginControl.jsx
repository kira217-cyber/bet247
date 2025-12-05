import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const LoginControl = () => {
  const {
    loginImage,
    setLoginImage,
    fetchLoginImage,
    loginImageId,
    setLoginImageId,
  } = useContext(AuthContext);

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // File select
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  // Upload image
  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("loginImage", file);

    try {
      await axios.post("http://localhost:5000/api/login-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchLoginImage();
      toast.success("Login Image uploaded successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete image
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/login-image/${loginImageId}`
      );
      fetchLoginImage();
      setIsDeleteModalOpen(false);
      toast.error("Login Image deleted successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#e4d9c8]">
      {/* Header */}
      <div className="bg-[#e3ac08] text-center py-2 font-bold text-lg">
        Login Page Control
      </div>

      {/* Upload Section */}
      <div className="bg-black text-white p-2 lg:px-16 flex justify-between items-center">
        <h2 className="font-semibold">Upload Login Page Image</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e3ac08] text-black px-3 py-1 rounded-sm text-sm hover:bg-yellow-700 hover:cursor-pointer"
        >
          +Add
        </button>
      </div>

      {/* Show uploaded image */}
      {loginImage ? (
        <div className="relative p-5 lg:px-16">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="absolute top-2 right-2 lg:right-14 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 hover:cursor-pointer"
          >
            <FaTimes />
          </button>

          <img
            src={loginImage}
            alt="Login Image"
            className="w-full max-h-40 object-contain border p-3"
          />
        </div>
      ) : (
        <p className="text-black p-5 border rounded">
          No Login Image selected, please upload one
        </p>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-[400px] relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPreview(null); // or যেটা দরকার সেটা set করবেন
              }}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded"
            >
              <FaTimes />
            </button>

            <div
              className="m-4 border-2 border-dashed rounded-md p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <p className="text-gray-700">Drag & drop or choose file</p>
              <div className="flex justify-center mt-4">
                <label className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:cursor-pointer">
                  + Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                
              </div>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto mt-4 w-32 h-32 object-cover border"
                />
              )}
            </div>

            <div className="flex justify-center mb-4">
              <button
                onClick={handleUpload}
                className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800"
              >
                + Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-[350px] p-6 relative">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginControl;
