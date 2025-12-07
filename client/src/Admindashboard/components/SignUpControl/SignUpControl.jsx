import React, { useContext, useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const SignUpControl = () => {
  const { fetchSignupImage, signupImage, signupId, setSignupId } = useContext(AuthContext);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // file select
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // drag drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  // Upload Image
  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image");
    const formData = new FormData();
    formData.append("signupImage", file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/signup-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchSignupImage();
      toast.success("Signup Image Uploaded Successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Image
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/signup-image/${signupId}`);
      fetchSignupImage();
      setIsDeleteModalOpen(false);
      toast.error("Signup image deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#e4d9c8]">
      {/* Header */}
      <div className="bg-[#e3ac08] text-center py-2 font-bold text-lg">
        Signup Page Control
      </div>

      {/* Upload Section */}
      <div className="bg-black text-white p-2 lg:px-16 flex justify-between items-center">
        <h2 className="font-semibold">Upload Signup Image</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e3ac08] text-black px-3 py-1 rounded-sm text-sm hover:cursor-pointer hover:bg-yellow-700"
        >
          + Add
        </button>
      </div>

      {/* Preview */}
      {signupImage ? (
        <div className="relative p-5 lg:px-16">
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="absolute top-2 right-2 lg:right-14 bg-red-600 text-white p-1 rounded-full"
          >
            <FaTimes />
          </button>
          <img
            src={signupImage}
            alt="Signup Banner"
            className="w-full max-h-40 object-contain border p-3"
          />
        </div>
      ) : (
        <p className="text-black p-5 border rounded">
          No Signup Image selected, please upload.
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
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 hover:cursor-pointer"
            >
              <FaTimes />
            </button>

            <div
              className="m-4 border-2 border-dashed rounded-md p-6 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1091/1091000.png"
                alt="upload icon"
                className="mx-auto w-12 mb-3"
              />
              <p className="text-gray-700">Select an image or drag & drop</p>
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
                className="bg-gray-700 text-white px-5 py-2 rounded hover:cursor-pointer"
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
          <div className="bg-white rounded-md shadow-lg w-[350px] p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:cursor-pointer"
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

export default SignUpControl;
