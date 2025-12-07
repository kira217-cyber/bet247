import axios from "axios";
import { Currency, User } from "lucide-react";
import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW
  const [logo, setLogo] = useState(null);
  const [id, setId] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [settings, setSettings] = useState({ title: "", favicon: "" });
  const [signupImage, setSignupImage] = useState(null);
  const [signupId, setSignupId] = useState(null);
  const [loginImage, setLoginImage] = useState(null);
  const [loginImageId, setLoginImageId] = useState(null);
  const [AdminLoginImage, setAdminLoginImage] = useState(null);
  const [navbar, setNavbar] = useState({});
  const [webMenu, setWebMenu] = useState({});
  const [mobileMenu, setMobileMenu] = useState({});
  const [mobileMenuSidebar, setMobileMenuSidebar] = useState({});
  const [footer, setFooter] = useState({});
  const [sidebarData, setSidebarData] = useState(null);
  const [balance,setBalance] = useState('');
  const [loginUser, setLoginUser] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [userBalance, setUserBalance] = useState(0);


 useEffect(() => {
  const storedUser = localStorage.getItem("admin");
  if (storedUser) setUser(JSON.parse(storedUser));
  setLoading(false); // Finished loading
}, []);

const login = (userData) => {
  setUser(userData);
  localStorage.setItem("admin", JSON.stringify(userData));
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("admin");
};

// ---------------- Get Mother Admin Balance ----------------
  const fetchBalance = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/balance`,
        {
          params: { role: user.role, id: user._id }, // id পাঠানো হচ্ছে
        }
      );

      if (res.data?.balance !== undefined) {
        setBalance(res.data.balance);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch balance");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);


  // backend থেকে logo ফেচ
  const fetchLogo = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/logo`);

      // যদি ডাটাবেসে logo থাকে
      if (data && data.logoUrl) {
        setLogo(data.logoUrl);
        setId(data._id);


      } else {
        console.log("No logo found in DB");
        setLogo(null); // fallback
      }
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };
  useEffect(() => {
    fetchLogo();
  }, []);

  // ✅ স্লাইডার ডাটা ফেচ
  const fetchSliders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/sliders`);
      setSliders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // favicon and title change
  const fetchSettings = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings`);
      if (data) {
        setSettings(data);

        // ✅ title apply করা
        if (data.title) {
          document.title = data.title;
        }

        // ✅ favicon apply করা
        if (data.faviconUrl) {
          let link =
            document.querySelector("link[rel~='icon']") ||
            document.createElement("link");
          link.rel = "icon";
          link.href = data.faviconUrl;
          document.head.appendChild(link);
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSignupImage = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/signup-image`
      );
      if (data && data.imageUrl) {
        setSignupImage(data.imageUrl);
        setSignupId(data._id);
      } else {
      }
    } catch (err) {
      console.error("Error fetching signup image:", err);
    }
  };

  useEffect(() => {
    fetchSignupImage();
  }, []);

  const fetchLoginImage = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/login-image`);
      if (data && data.imageUrl) {
        setLoginImage(data.imageUrl);
        setLoginImageId(data._id);
      } else {
        setLoginImage(null);
      }
    } catch (error) {
      console.error("Error fetching login image:", error);
    }
  };

  useEffect(() => {
    fetchLoginImage();
  }, []);

  // Fetch Login Image
  const fetchAdminLoginImage = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin-login-image`
      );
      if (data && data.loginImageUrl) {
        setAdminLoginImage(data.loginImageUrl);
        setId(data._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdminLoginImage();
  }, []);

  useEffect(() => {
    // Navbar settings fetch
    const fetchNavbar = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/navbar`);
        setNavbar(res.data);

      } catch (error) {
        console.error("Navbar API error:", error);
      }
    };

    fetchNavbar();
  }, []);

  // WebMenu settings fetch
  useEffect(() => {
    const fetchWebMenu = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/webmenu`);
        setWebMenu(res.data);

      } catch (error) {
        console.error("Navbar API error:", error);
      }
    };

    fetchWebMenu();
  }, []);

  // Mobile Menu Settings

  useEffect(() => {
    const fetchMobileMenu = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/mobilemenu`);
        setMobileMenu(res.data);

      } catch (error) {
        console.error("Navbar API error:", error);
      }
    };

    fetchMobileMenu();
  }, []);

  useEffect(() => {
    const fetchMobileMenu = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mobile-sidebar-style`
        );
        setMobileMenuSidebar(res.data);

      } catch (error) {
        console.error("Navbar API error:", error);
      }
    };

    fetchMobileMenu();
  }, []);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/footer`);
        setFooter(res.data);

      } catch (error) {
        console.error("Navbar API error:", error);
      }
    };

    fetchFooter();
  }, []);

  


  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/sidebar-menu`);
        setSidebarData(res.data.sidebarMenu);
      } catch (error) {
        console.error("Navbar API error:", error);
      }
    };

    fetchUrl();
  }, []);




  // 🔹 App লোড হলে localStorage থেকে ইউজার লোড করা
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setLoginUser(JSON.parse(savedUser));
    }
  }, []);

  // 🔹 লগইন করার পর ইউজার সেট করা
  const loginUserData = (userData) => {
    setLoginUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔹 লগআউট
  const logoutUserData = () => {
    setLoginUser(null);
    <Navigate to={'/'}></Navigate>
    localStorage.removeItem("user");
  };

// ================ Deposit Settings Fetch =================
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/deposit-payment/settings`);
        setCurrency(res.data.currencies[0] || "PBU");
      } catch (err) {
        console.error("Error fetching deposit settings:", err);
      }
    };
    fetchSettings();
  }, []);

  // ---------------- Get Mother Admin Balance ----------------
    const fetchUserBalance = async () => {
    if (!loginUser) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/balance`,
        {
          params: { role: loginUser.role, id: loginUser._id }, // id পাঠানো হচ্ছে
        }
      );

      if (res.data?.balance !== undefined) {
        setUserBalance(res.data.balance);
      }
    } catch (error) {
      console.error(error);

    }
  };

    useEffect(() => {
      fetchUserBalance();
    }, [loginUser]);

  // While loading, don’t render children to prevent flicker
  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        logo,
        setLogo,
        fetchLogo,
        id,
        setId,
        sliders,
        signupId,
        signupImage,
        setSignupId,
        fetchSignupImage,
        fetchLoginImage,
        setLoginImage,
        setLoginImageId,
        loginImage,
        loginImageId,
        AdminLoginImage,
        navbar,
        webMenu,
        mobileMenu,
        mobileMenuSidebar,
        footer,
        sidebarData,
        balance,
        loginUser,
        logoutUserData,
        loginUserData,
        userBalance,
        currency
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
