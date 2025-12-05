import React, { useContext, useState } from "react";
import { FaRedo } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AdminLogin = () => {
  // Validation code state
  const [code, setCode] = useState(generateCode());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, AdminLoginImage } = useContext(AuthContext);
  console.log(AdminLoginImage);
  const navigate = useNavigate();

  // Function to generate random 4-digit code
  function generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Refresh code
  const handleRefresh = () => {
    setCode(generateCode());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.user); // Save user to context & localStorage
      if (data.user.role === "Mother Admin") {
        navigate("/admin-dashboard"); // Only Mother Admin can access
      } else {
        toast.error(
          "You do not have permission to access the admin dashboard!"
        );
        navigate("/restricted"); // Redirect other admins to a restricted page
        toast.error(data.message);
      }
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center  bg-[url('https://i.ibb.co.com/bRLrsYTN/casino-test.webp')]
                 bg-cover bg-center bg-no-repeat"
      >
        <div className="flex justify-center items-center ">
          <div className="hidden lg:block rounded-2xl pl-2 pt-2 pb-2">
            <img
              src={AdminLoginImage}
              alt="picture"
              className="mx-auto h-[402px] rounded-l-2xl"
            />
          </div>
          <div className=" flex items-center justify-center bg-black px-8 py-6 lg:px-28 lg:py-7  lg:rounded-r-2xl">
            <div className="w-full max-w-sm bg-transparent text-center">
              {/* Logo */}
              <img
                src="https://i.ibb.co/3FW7ptF/logo.png" // এখানে আপনার লোগো দিন
                alt="Logo"
                className="mx-auto h-16 mb-4"
              />

              {/* Title */}
              <h2 className="text-white text-lg font-semibold mb-6">
                Mother Admin Login
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                {/* Password */}
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />

                {/* Validation Code */}
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Validation Code"
                    className="w-full px-3 py-2 rounded-l-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <span className="px-3 py-2 bg-white border border-gray-300 font-bold">
                    {code}
                  </span>
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="px-3 py-2 bg-yellow-500 rounded-r-md hover:bg-yellow-600 flex items-center justify-center"
                  >
                    <FaRedo
                      size={25}
                      className="text-white hover:cursor-pointer"
                    />
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-md hover:cursor-pointer"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
