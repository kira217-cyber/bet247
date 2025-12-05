import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// প্রতিবার রিকোয়েস্টে admin এর `_id` হেডারে যাবে
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?._id) {
    config.headers["x-admin-id"] = user._id;  // 🟡 এখানে সেট হচ্ছে
  }
  return config;
});

export default api;