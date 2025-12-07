require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const multer = require("multer");

const app = express();
// Serve static files from "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let adminsCollection;
let logoCollection;
let sliderCollection;
let settingsCollection;
let signupImageCollection;
let loginImageCollection;
let adminLoginImageCollection;
let navbarSettingsCollection;
let webMenuSettingsCollection;
let mobileMenuSettingsCollection;
let mobileSidebarStyleCollection;
let footerSettingsCollection;
let mobileSidebarMenuCollection;
let transactions;
let depositSettingsCollection;
let depositTransactionsCollection;
let gameCategoriesCollection;
let selectedGamesCollection;
let gameHistoryCollection;

async function run() {
  try {
    await client.connect();

    // Database & Collection
    const db = client.db("bet247"); // database name
    adminsCollection = db.collection("admin-collection"); // collection name
    logoCollection = db.collection("logo");
    sliderCollection = db.collection("sliders");
    settingsCollection = db.collection("settings");
    signupImageCollection = db.collection("signupImage");
    loginImageCollection = db.collection("loginImage");
    adminLoginImageCollection = db.collection("admin-login-image");
    navbarSettingsCollection = db.collection("navbar_settings");
    webMenuSettingsCollection = db.collection("web_menu_settings");
    mobileMenuSettingsCollection = db.collection("mobile_menu_settings");
    mobileSidebarStyleCollection = db.collection("mobile_sidebar_settings");
    footerSettingsCollection = db.collection("footer_settings");
    mobileSidebarMenuCollection = db.collection("url_settings");
    transactions = db.collection("transactions");
    depositSettingsCollection = db.collection("deposit_settings");
    depositTransactionsCollection = db.collection("deposit_transactions");
    gameCategoriesCollection = db.collection("game_categories");
    selectedGamesCollection = db.collection("selected_games");
    gameHistoryCollection = db.collection("game_history"); // গেম হিস্ট্রি

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
run();

// ==== Multer Storage ====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // লোকাল uploads ফোল্ডারে save হবে
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique নাম
  },
});
const upload = multer({ storage });

// ==== Serve static files ====
app.use("/uploads", express.static("uploads"));

// ==== Multer Config for Sliders ====
const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadSlider = multer({ storage: sliderStorage });

// ================= ROUTES =================

// 1️⃣ Get all admins
// server.js or app.js

app.get("/admins", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 15 } = req.query;

    // Build the query with search across username, fullname, and email
    const query = {};
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch total count
    const total = await adminsCollection.countDocuments(query);

    // Fetch paginated admins
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const admins = await adminsCollection
      .find(query)
      .skip(startIndex)
      .limit(parseInt(limit))
      .toArray();

    res.json({ admins, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
});

// GET /api/admins/:id
app.get("/api/admins/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await adminsCollection.findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    ); // password বাদ দিয়ে
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// admin put

// Update Admin Profile with Role Check
app.put("/api/admins/:id", async (req, res) => {
  try {
    const id = req.params.id; // যে user modify হবে
    const editorId = req.headers["x-admin-id"]; // কে modify করছে
    const updateData = { ...req.body };

    if (!editorId) {
      return res.status(401).json({ error: "Unauthorized: Missing editor ID" });
    }

    // modifier কে খুঁজে বের করা
    const editor = await adminsCollection.findOne({
      _id: new ObjectId(editorId),
    });
    if (!editor) {
      return res.status(403).json({ error: "Invalid editor" });
    }

    // target admin কে খুঁজে বের করা
    const target = await adminsCollection.findOne({ _id: new ObjectId(id) });
    if (!target) {
      return res.status(404).json({ error: "Target admin not found" });
    }

    // role hierarchy (উচ্চ থেকে নিম্ন)
    const hierarchy = [
      "Mother Admin",
      "Sub Admin",
      "Master",
      "Agent",
      "Sub Agent",
      "User",
    ];

    const editorRank = hierarchy.indexOf(editor.role);
    const targetRank = hierarchy.indexOf(target.role);

    // Rule: editor কেবল তার চেয়ে "নিচের rank" modify করতে পারবে
    if (editorRank === -1 || targetRank === -1) {
      return res.status(400).json({ error: "Invalid role" });
    }

    if (editorRank >= targetRank) {
      return res
        .status(403)
        .json({ error: "You are not allowed to modify this admin" });
    }

    // password খালি থাকলে বাদ দিন
    if (!updateData.password) {
      delete updateData.password;
    }

    const result = await adminsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "No changes applied" });
    }

    res.json({ success: true, message: "Admin updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 2️⃣ Get single admin by email
app.get("/admins/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const admin = await adminsCollection.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
});

// 3️⃣ Create new admin
app.post("/api/admins", async (req, res) => {
  try {
    const newAdmin = req.body;

    if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
      return res
        .status(400)
        .json({ message: "Username, Email & Password are required" });
    }

    // Check if user already exists
    const exists = await adminsCollection.findOne({ email: newAdmin.email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const result = await adminsCollection.insertOne({
      ...newAdmin,
      balance: 0,
      status: "Activated",
      joinedAt: new Date(),
      lastLogin: "Never",
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
});

// 4️⃣ Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminsCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ⚠️ Plain text password (only for testing)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Update lastLogin time
    const currentTime = new Date().toLocaleString();
    await adminsCollection.updateOne(
      { email },
      { $set: { lastLogin: currentTime } }
    );

    // Remove password before sending
    const { password: _, ...userData } = { ...user, lastLogin: currentTime };

    res.json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Create new admin
app.post("/api/admins", async (req, res) => {
  try {
    const newAdmin = req.body;
    if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
      return res
        .status(400)
        .json({ message: "Username, Email & Password required" });
    }

    const exists = await adminsCollection.findOne({ email: newAdmin.email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const result = await adminsCollection.insertOne({
      ...newAdmin,
      balance: 0,
      status: "Activated",
      joinedAt: new Date(),
      lastLogin: "Never",
    });

    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
});

// role hierarchy define করে দিচ্ছি
const roleHierarchy = {
  "Mother Admin": ["Sub Admin", "Master", "Agent", "Sub Agent", "User"],
  "Sub Admin": ["Master", "Agent", "Sub Agent", "User"],
  Master: ["Agent", "Sub Agent", "User"],
  Agent: ["Sub Agent", "User"],
  "Sub Agent": ["User"],
};

// ✅ Update user status (Activate/Deactivate)
app.patch("/api/admins/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { action, requesterRole, targetRole } = req.body;

    // Action valid কিনা check
    if (!["Activate", "Deactivate"].includes(action)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    // Permission check
    if (
      requesterRole !== "Mother Admin" &&
      !roleHierarchy[requesterRole]?.includes(targetRole)
    ) {
      return res.status(403).json({
        success: false,
        message: "You don’t have permission to manage this role",
      });
    }

    const result = await adminsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: action === "Activate" ? "Activated" : "Deactivated" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or already same status",
      });
    }

    res.json({
      success: true,
      message: `User ${action.toLowerCase()}d successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Ban user (Mother Admin only)
app.patch("/api/admins/:id/ban", async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (role !== "Mother Admin") {
      return res
        .status(403)
        .json({ message: "Only Mother Admin can perform this action" });
    }

    const result = await adminsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "Banned" } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or already banned" });
    }

    res.json({ success: true, message: "User banned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get logo
app.get("/api/logo", async (req, res) => {
  const logo = await logoCollection.findOne({});
  res.json(logo || {});
});

app.post("/api/logo", upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("✅ File received:", req.file);

    const logoUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
    console.log("✅ Generated logoUrl:", logoUrl);

    const existing = await logoCollection.findOne({});
    if (existing) {
      await logoCollection.updateOne(
        { _id: existing._id },
        { $set: { logoUrl } }
      );
    } else {
      await logoCollection.insertOne({ logoUrl });
    }

    res.json({ logoUrl });
  } catch (err) {
    console.error("❌ Upload error:", err); // 👈 এখানে আসল error দেখাবে
    res.status(500).json({ error: err.message });
  }
});

// =======================
// =======================
// Delete logo
app.delete("/api/logo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const logo = await logoCollection.findOne({ _id: new ObjectId(id) });

    if (!logo) {
      return res.status(404).json({ message: "Logo not found" });
    }

    // file delete (DB তে filename রাখতে হবে)
    if (logo.filename) {
      const filePath = path.join(__dirname, "uploads", logo.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // mongo থেকে delete
    await logoCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Logo deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Error deleting logo" });
  }
});

// ================= SLIDER ROUTES =================

// Get all sliders
app.get("/api/sliders", async (req, res) => {
  try {
    const sliders = await sliderCollection.find({}).toArray();
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sliders", error: err });
  }
});

// Upload slider
app.post("/api/sliders", uploadSlider.single("slider"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
    const newSlider = { imageUrl, filename: req.file.filename };

    const result = await sliderCollection.insertOne(newSlider);

    res.json({ success: true, insertedId: result.insertedId, imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Error uploading slider", error: err });
  }
});

// Delete slider
app.delete("/api/sliders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await sliderCollection.findOne({ _id: new ObjectId(id) });

    if (!slider) {
      return res.status(404).json({ message: "Slider not found" });
    }

    // Delete local file
    if (slider.filename) {
      const filePath = path.join(__dirname, "uploads", slider.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from DB
    await sliderCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({ success: true, message: "Slider deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting slider", error: err });
  }
});

// ========= Fav icon and Title Routes ===============

app.get("/api/settings", async (req, res) => {
  try {
    const settings = await settingsCollection.findOne({});
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.post("/api/settings", upload.single("favicon"), async (req, res) => {
  try {
    const { title } = req.body;
    let faviconUrl = null;

    if (req.file) {
      faviconUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
    }

    const existing = await settingsCollection.findOne({});
    if (existing) {
      await settingsCollection.updateOne(
        { _id: existing._id },
        { $set: { title, ...(faviconUrl && { faviconUrl }) } }
      );
    } else {
      await settingsCollection.insertOne({ title, faviconUrl });
    }

    res.json({ message: "Settings updated successfully", title, faviconUrl });
  } catch (err) {
    console.error("❌ Settings error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/settings/favicon/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const settings = await settingsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!settings)
      return res.status(404).json({ message: "Settings not found" });

    await settingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $unset: { faviconUrl: "" } }
    );

    res.json({ message: "Favicon deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting favicon" });
  }
});

// Upload Signup Image
app.post(
  "/api/signup-image",
  upload.single("signupImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
      const existing = await signupImageCollection.findOne({});

      if (existing) {
        await signupImageCollection.updateOne(
          { _id: existing._id },
          { $set: { imageUrl, filename: req.file.filename } }
        );
      } else {
        await signupImageCollection.insertOne({
          imageUrl,
          filename: req.file.filename,
        });
      }

      res.json({ imageUrl });
    } catch (err) {
      console.error("❌ Upload error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Get Signup Image
app.get("/api/signup-image", async (req, res) => {
  const signupImage = await signupImageCollection.findOne({});
  res.json(signupImage || {});
});

// Delete Signup Image
app.delete("/api/signup-image/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const image = await signupImageCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!image) {
      return res.status(404).json({ message: "Signup image not found" });
    }

    if (image.filename) {
      const filePath = path.join(__dirname, "uploads", image.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await signupImageCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Signup image deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Error deleting signup image" });
  }
});

// ================= LOGIN IMAGE =================

// Get login image
app.get("/api/login-image", async (req, res) => {
  const loginImage = await loginImageCollection.findOne({});
  res.json(loginImage || {});
});

// Upload Login Image

app.post("/api/login-image", upload.single("loginImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;
    const existing = await loginImageCollection.findOne({});

    if (existing) {
      await loginImageCollection.updateOne(
        { _id: existing._id },
        { $set: { imageUrl, filename: req.file.filename } }
      );
    } else {
      await loginImageCollection.insertOne({
        imageUrl,
        filename: req.file.filename,
      });
    }

    res.json({ imageUrl });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Delete login image
app.delete("/api/login-image/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const image = await loginImageCollection.findOne({ _id: new ObjectId(id) });

    if (!image) {
      return res.status(404).json({ message: "Signup image not found" });
    }

    if (image.filename) {
      const filePath = path.join(__dirname, "uploads", image.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await loginImageCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Signup image deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Error deleting signup image" });
  }
});

// Get Login Image
app.get("/api/admin-login-image", async (req, res) => {
  try {
    const image = await adminLoginImageCollection.findOne({});
    res.json(image || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching login image", error });
  }
});

// Upload Login Image
app.post(
  "/api/admin-login-image",
  upload.single("loginImage"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const loginImageUrl = `${process.env.API_URL}/uploads/${req.file.filename}`;

      const existing = await adminLoginImageCollection.findOne({});
      if (existing) {
        await adminLoginImageCollection.updateOne(
          { _id: existing._id },
          { $set: { loginImageUrl } }
        );
      } else {
        await adminLoginImageCollection.insertOne({ loginImageUrl });
      }

      res.json({ loginImageUrl });
    } catch (error) {
      res.status(500).json({ message: "Error uploading login image", error });
    }
  }
);

// Delete Login Image
app.delete("/api/admin-login-image/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const image = await adminLoginImageCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!image) {
      return res.status(404).json({ message: "Login image not found" });
    }

    await adminLoginImageCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Login image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting login image", error });
  }
});

// GET Navbar Settings
app.get("/api/navbar", async (req, res) => {
  try {
    const settings = await navbarSettingsCollection.findOne({});
    if (!settings)
      return res.status(404).json({ message: "Navbar settings not found" });
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE or UPDATE Navbar Settings
app.post("/api/navbar", async (req, res) => {
  try {
    const { bgColor, textColor, fontSize, bgButtonColor, signUpButtonBgColor } =
      req.body;
    const existing = await navbarSettingsCollection.findOne({});

    if (existing) {
      // Update existing
      await navbarSettingsCollection.updateOne(
        { _id: existing._id },
        {
          $set: {
            bgColor,
            textColor,
            fontSize,
            bgButtonColor,
            signUpButtonBgColor,
          },
        }
      );
      res.json({
        ...existing,
        bgColor,
        textColor,
        fontSize,
        bgButtonColor,
        signUpButtonBgColor,
      });
    } else {
      // Insert new
      const result = await navbarSettingsCollection.insertOne({
        bgColor,
        textColor,
        fontSize,
        bgButtonColor,
        signUpButtonBgColor,
      });
      res.json({
        _id: result.insertedId,
        bgColor,
        textColor,
        fontSize,
        bgButtonColor,
        signUpButtonBgColor,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Web Menu Settings
app.get("/api/webmenu", async (req, res) => {
  try {
    const menuSettings = await webMenuSettingsCollection.findOne({});
    if (!menuSettings)
      return res.status(404).json({ message: "Web menu settings not found" });

    res.json(menuSettings);
  } catch (error) {
    console.error("Error fetching web menu settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE or UPDATE Web Menu Settings
app.post("/api/webmenu", async (req, res) => {
  try {
    const {
      webMenuBgColor,
      webMenuTextColor,
      webMenuFontSize,
      webMenuHoverColor,
    } = req.body;
    const existing = await webMenuSettingsCollection.findOne({});

    if (existing) {
      // Update
      await webMenuSettingsCollection.updateOne(
        { _id: existing._id },
        {
          $set: {
            webMenuBgColor,
            webMenuTextColor,
            webMenuFontSize,
            webMenuHoverColor,
          },
        }
      );
      res.json({
        ...existing,
        webMenuBgColor,
        webMenuTextColor,
        webMenuFontSize,
        webMenuHoverColor,
      });
    } else {
      // Insert new
      const result = await webMenuSettingsCollection.insertOne({
        webMenuBgColor,
        webMenuTextColor,
        webMenuFontSize,
        webMenuHoverColor,
      });
      res.json({
        _id: result.insertedId,
        webMenuBgColor,
        webMenuTextColor,
        webMenuFontSize,
        webMenuHoverColor,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// =======================
// MOBILE MENU API ROUTES
// =======================

// GET Mobile Menu Settings
app.get("/api/mobilemenu", async (req, res) => {
  try {
    const menuSettings = await mobileMenuSettingsCollection.findOne({});
    if (!menuSettings)
      return res
        .status(404)
        .json({ message: "Mobile menu settings not found" });

    res.json(menuSettings);
  } catch (error) {
    console.error("Error fetching mobile menu settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE or UPDATE Mobile Menu Settings
app.post("/api/mobilemenu", async (req, res) => {
  try {
    const {
      loginBtnColor,
      signupBtnColor,
      btnFontSize,
      pageBgColor,
      pageFontSize,
      buttonFontColor,
      loginPageBgColor,
    } = req.body;

    const existing = await mobileMenuSettingsCollection.findOne({});

    if (existing) {
      // Update
      await mobileMenuSettingsCollection.updateOne(
        { _id: existing._id },
        {
          $set: {
            loginBtnColor,
            signupBtnColor,
            btnFontSize,
            pageBgColor,
            pageFontSize,
            buttonFontColor,
            loginPageBgColor,
          },
        }
      );
      res.json({
        ...existing,
        loginBtnColor,
        signupBtnColor,
        btnFontSize,
        pageBgColor,
        pageFontSize,
        buttonFontColor,
        loginPageBgColor,
      });
    } else {
      // Insert new
      const result = await mobileMenuSettingsCollection.insertOne({
        loginBtnColor,
        signupBtnColor,
        btnFontSize,
        pageBgColor,
        pageFontSize,
        buttonFontColor,
        loginPageBgColor,
      });
      res.json({
        _id: result.insertedId,
        loginBtnColor,
        signupBtnColor,
        btnFontSize,
        pageBgColor,
        pageFontSize,
        buttonFontColor,
        loginPageBgColor,
      });
    }
  } catch (error) {
    console.error("Error saving mobile menu settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Mobile Sidebar Style
app.get("/api/mobile-sidebar-style", async (req, res) => {
  try {
    const style = await mobileSidebarStyleCollection.findOne({});
    if (!style) {
      return res
        .status(404)
        .json({ message: "Mobile sidebar style not found" });
    }
    res.json(style);
  } catch (error) {
    console.error("Error fetching sidebar style:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE or UPDATE Mobile Sidebar Style
app.post("/api/mobile-sidebar-style", async (req, res) => {
  try {
    const {
      gradientDirection,
      gradientFrom,
      gradientTo,
      sideTextColor,
      fontSize,
    } = req.body;

    const existing = await mobileSidebarStyleCollection.findOne({});

    if (existing) {
      // Update
      await mobileSidebarStyleCollection.updateOne(
        { _id: existing._id },
        {
          $set: {
            gradientDirection,
            gradientFrom,
            gradientTo,
            sideTextColor,
            fontSize,
          },
        }
      );

      res.json({
        _id: existing._id,
        gradientDirection,
        gradientFrom,
        gradientTo,
        sideTextColor,
        fontSize,
      });
    } else {
      // Insert new
      const result = await mobileSidebarStyleCollection.insertOne({
        gradientDirection,
        gradientFrom,
        gradientTo,
        sideTextColor,
        fontSize,
      });

      res.json({
        _id: result.insertedId,
        gradientDirection,
        gradientFrom,
        gradientTo,
        sideTextColor,
        fontSize,
      });
    }
  } catch (error) {
    console.error("Error saving mobile sidebar style:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Footer Settings
app.get("/api/footer", async (req, res) => {
  try {
    const footerSettings = await footerSettingsCollection.findOne({});
    if (!footerSettings)
      return res.status(404).json({ message: "Footer settings not found" });

    res.json(footerSettings);
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE or UPDATE Footer Settings
app.post("/api/footer", async (req, res) => {
  try {
    const { footerTextColor, footerFontSize } = req.body;

    const existing = await footerSettingsCollection.findOne({});

    if (existing) {
      // Update
      await footerSettingsCollection.updateOne(
        { _id: existing._id },
        { $set: { footerTextColor, footerFontSize } }
      );
      res.json({
        ...existing,
        footerTextColor,
        footerFontSize,
      });
    } else {
      // Insert new
      const result = await footerSettingsCollection.insertOne({
        footerTextColor,
        footerFontSize,
      });
      res.json({
        _id: result.insertedId,
        footerTextColor,
        footerFontSize,
      });
    }
  } catch (error) {
    console.error("Error saving footer settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET Sidebar Menu Links
app.get("/api/sidebar-menu", async (req, res) => {
  try {
    const menu = await mobileSidebarMenuCollection.findOne({});
    if (!menu)
      return res.status(404).json({ message: "Sidebar menu not found" });
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// CREATE or UPDATE Sidebar Menu Links
app.post("/api/sidebar-menu", async (req, res) => {
  try {
    const { sidebarMenu } = req.body; // sidebarMenu = [{label, icon, url}, ...]

    const existing = await mobileSidebarMenuCollection.findOne({});

    if (existing) {
      await mobileSidebarMenuCollection.updateOne(
        { _id: existing._id },
        { $set: { sidebarMenu } }
      );
      res.json({ ...existing, sidebarMenu });
    } else {
      const result = await mobileSidebarMenuCollection.insertOne({
        sidebarMenu,
      });
      res.json({ _id: result.insertedId, sidebarMenu });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ---------------------- GET Mother Admin Balance ----------------------
app.get("/api/admin/balance", async (req, res) => {
  try {
    const { role, id } = req.query; // frontend থেকে role + id পাঠানো হবে

    if (!role || !id) {
      return res.status(400).json({ message: "Role and id required" });
    }

    const admin = await adminsCollection.findOne({
      role,
      _id: new ObjectId(id),
    });

    if (!admin) {
      return res.status(404).json({ message: `${role} not found` });
    }

    res.status(200).json({
      message: "Balance fetched successfully",
      balance: admin.balance || 0,
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// ---------------------- PUT Update Mother Admin Balance ----------------------

app.put("/api/mother-admin/balance", async (req, res) => {
  try {
    const { amount, role } = req.body;
    const value = parseFloat(amount);

    if (role !== "Mother Admin") {
      return res
        .status(403)
        .json({ message: "Only Mother Admin can add balance" });
    }

    if (isNaN(value) || value <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const filter = { role: "Mother Admin" };
    const updateDoc = { $inc: { balance: value } };

    const result = await adminsCollection.updateOne(filter, updateDoc);

    if (result.matchedCount > 0) {
      const updatedAdmin = await adminsCollection.findOne(filter);
      return res.status(200).json({
        message: "Balance updated successfully",
        admin: updatedAdmin,
      });
    }

    return res.status(404).json({ message: "Mother Admin not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Update Admin Profile
app.put("/api/profile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };

    // যদি password খালি থাকে তাহলে বাদ দিন
    if (!updateData.password) {
      delete updateData.password;
    }

    const result = await adminsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "No changes applied" });
    }

    res.json({ success: true, message: "Admin updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// API endpoint to fetch users with role "User"
app.get("/api/users", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 15 } = req.query;

    // Build the query: filter by role "User" and search across username, fullname, email
    const query = {
      role: "User", // Only fetch users with role "User"
    };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch total count
    const total = await adminsCollection.countDocuments(query);

    // Fetch paginated users
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const filteredUsers = await adminsCollection
      .find(query)
      .skip(startIndex)
      .limit(parseInt(limit))
      .toArray();

    res.json({ users: filteredUsers, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/sub-agents", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 15 } = req.query;

    // Build the query: filter by role "User" and search across username, fullname, email
    const query = {
      role: "Sub Agent", // Only fetch users with role "User"
    };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch total count
    const total = await adminsCollection.countDocuments(query);

    // Fetch paginated users
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const filteredUsers = await adminsCollection
      .find(query)
      .skip(startIndex)
      .limit(parseInt(limit))
      .toArray();

    res.json({ users: filteredUsers, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/sub-admins", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 15 } = req.query;

    // Build the query: filter by role "User" and search across username, fullname, email
    const query = {
      role: "Sub Admin", // Only fetch users with role "User"
    };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch total count
    const total = await adminsCollection.countDocuments(query);

    // Fetch paginated users
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const filteredUsers = await adminsCollection
      .find(query)
      .skip(startIndex)
      .limit(parseInt(limit))
      .toArray();

    res.json({ users: filteredUsers, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/agents", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 15 } = req.query;

    // Build the query: filter by role "User" and search across username, fullname, email
    const query = {
      role: "Agent", // Only fetch users with role "User"
    };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch total count
    const total = await adminsCollection.countDocuments(query);

    // Fetch paginated users
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const filteredUsers = await adminsCollection
      .find(query)
      .skip(startIndex)
      .limit(parseInt(limit))
      .toArray();

    res.json({ users: filteredUsers, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/masters", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 15 } = req.query;

    // Build the query: filter by role "User" and search across username, fullname, email
    const query = {
      role: "Master", // Only fetch users with role "User"
    };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch total count
    const total = await adminsCollection.countDocuments(query);

    // Fetch paginated users
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const filteredUsers = await adminsCollection
      .find(query)
      .skip(startIndex)
      .limit(parseInt(limit))
      .toArray();

    res.json({ users: filteredUsers, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/mother-admins", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 15 } = req.query;

    // Build the query: filter by role "User" and search across username, fullname, email
    const query = {
      role: "Mother Admin", // Only fetch users with role "User"
    };

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: "i" } },
        { fullname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Fetch total count
    const total = await adminsCollection.countDocuments(query);

    // Fetch paginated users
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const filteredUsers = await adminsCollection
      .find(query)
      .skip(startIndex)
      .limit(parseInt(limit))
      .toArray();

    res.json({ users: filteredUsers, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ========== BACKEND CODE ==========

// Get All Users (role: "User" only)
app.get("/all-users", async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "15", 10);
    const skip = (page - 1) * limit;

    const filter = {
      ...(search
        ? {
            $or: [
              { username: { $regex: search, $options: "i" } },
              { fullname: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {}),
    };

    const total = await adminsCollection.countDocuments(filter);
    const users = await adminsCollection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({ users, total });
  } catch (err) {
    console.error("Error fetching users", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Transaction API
app.post("/transaction", async (req, res) => {
  try {
    const { actorId, toUserId, amount, type } = req.body;
    const amt = Number(amount);

    if (!actorId || !toUserId || !amt || amt <= 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const actor = await adminsCollection.findOne({
      _id: new ObjectId(actorId),
    });
    const targetUser = await adminsCollection.findOne({
      _id: new ObjectId(toUserId),
    });

    if (!actor || !targetUser)
      return res.status(404).json({ message: "Not found" });

    // ✅ Role Permission Mapping
    const rolePermissions = {
      "Mother Admin": ["Sub Admin", "Master", "Agent", "Sub Agent", "User"],
      "Sub Admin": ["Master", "Agent", "Sub Agent", "User"],
      Master: ["Agent", "Sub Agent", "User"],
      Agent: ["Sub Agent", "User"],
      "Sub Agent": ["User"],
      User: [],
    };

    // Check if actor can send to target
    if (
      !rolePermissions[actor.role].includes(targetUser.role) &&
      actor.role !== "Mother Admin"
    ) {
      return res.status(403).json({
        message: `${actor.role} cannot send money to ${targetUser.role}`,
      });
    }

    // ✅ Only Mother Admin can "minus"
    if (type === "minus" && actor.role !== "Mother Admin") {
      return res
        .status(403)
        .json({ message: "Only Mother Admin can minus money" });
    }

    // ✅ Add Money
    if (type === "add") {
      if (actor.balance < amt) {
        return res.status(400).json({ message: "Not enough balance" });
      }

      await adminsCollection.updateOne(
        { _id: actor._id },
        { $inc: { balance: -amt } }
      );
      await adminsCollection.updateOne(
        { _id: targetUser._id },
        { $inc: { balance: amt } }
      );
    }

    // ✅ Minus Money (only by Mother Admin)
    if (type === "minus" && actor.role === "Mother Admin") {
      if (targetUser.balance < amt) {
        return res
          .status(400)
          .json({ message: "User has insufficient balance" });
      }

      await adminsCollection.updateOne(
        { _id: targetUser._id },
        { $inc: { balance: -amt } }
      );
      await adminsCollection.updateOne(
        { _id: actor._id },
        { $inc: { balance: amt } }
      );
    }

    // ✅ Save Transaction History
    await transactions.insertOne({
      from: { id: actor._id, username: actor.username, role: actor.role },
      to: {
        id: targetUser._id,
        username: targetUser.username,
        role: targetUser.role,
      },
      amount: amt,
      type,
      createdAt: new Date(),
    });

    res.json({ message: "Transaction success" });
  } catch (err) {
    console.error("Transaction error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Transaction History
app.get("/transactions", async (req, res) => {
  try {
    const history = await transactions
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    res.json(history);
  } catch (err) {
    console.error("History fetch error", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Total Balance for all role === "User"
app.get("/api/users/total-balance", async (req, res) => {
  try {
    // MongoDB aggregate দিয়ে শুধু role = "User" ফিল্টার করা হচ্ছে
    const result = await adminsCollection
      .aggregate([
        { $match: { role: "User" } }, // শুধু role === "User"
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balance" }, // সব User এর balance যোগ
          },
        },
      ])
      .toArray();

    const total = result.length > 0 ? result[0].totalBalance : 0;
    res.json({ totalBalance: total }); // frontend এ পাঠানো হবে
  } catch (error) {
    console.error("Error getting total user balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Total Sub Agent Balance
app.get("/api/subagents/total-balance", async (req, res) => {
  try {
    const result = await adminsCollection
      .aggregate([
        { $match: { role: "Sub Agent" } }, // শুধু Sub Agent role
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balance" }, // সব Sub Agent এর balance যোগ
          },
        },
      ])
      .toArray();

    const total = result.length > 0 ? result[0].totalBalance : 0;
    res.json({ totalBalance: total });
  } catch (error) {
    console.error("Error getting total Sub Agent balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Total Agent Balance (only role = "Agent")
app.get("/api/agents/total-balance", async (req, res) => {
  try {
    const result = await adminsCollection
      .aggregate([
        { $match: { role: "Agent" } }, // শুধু Agent role ফিল্টার করা হচ্ছে
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balance" }, // সব Agent এর balance যোগ করা হচ্ছে
          },
        },
      ])
      .toArray();

    const total = result.length > 0 ? result[0].totalBalance : 0;
    res.json({ totalBalance: total });
  } catch (error) {
    console.error("Error getting total Agent balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Total Master Balance (only role = "Master")
app.get("/api/masters/total-balance", async (req, res) => {
  try {
    const result = await adminsCollection
      .aggregate([
        { $match: { role: "Master" } }, // শুধু Master role filter
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balance" }, // সব Master এর balance যোগ
          },
        },
      ])
      .toArray();

    const total = result.length > 0 ? result[0].totalBalance : 0;
    res.json({ totalBalance: total });
  } catch (error) {
    console.error("Error getting total Master balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Total Sub Admin Balance (only role = "Sub Admin")
app.get("/api/subadmins/total-balance", async (req, res) => {
  try {
    const result = await adminsCollection
      .aggregate([
        { $match: { role: "Sub Admin" } }, // শুধু Sub Admin role filter করা হচ্ছে
        {
          $group: {
            _id: null,
            totalBalance: { $sum: "$balance" }, // সব Sub Admin এর balance যোগ
          },
        },
      ])
      .toArray();

    const total = result.length > 0 ? result[0].totalBalance : 0;
    res.json({ totalBalance: total });
  } catch (error) {
    console.error("Error getting total Sub Admin balance:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login API
app.post("/api/login-user", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Please fill all fields" });

    // Case-insensitive search with trim
    const user = await adminsCollection.findOne({
      username: { $regex: `^${username.trim()}$`, $options: "i" },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Password check
    if (user.password !== password)
      return res.status(401).json({ message: "Invalid password" });

    // Update lastLogin
    await adminsCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date().toLocaleString() } }
    );

    // Response without password
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        role: user.role,
        balance: user.balance,
        status: user.status,
        loginStatus: "self-login",
        joinedAt: user.joinedAt,
        lastLogin: new Date().toLocaleString(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ User Signup API
app.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, username, password } = req.body;

    // ফাঁকা থাকলে error
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // চেক করবো username আগেই আছে কিনা
    const existingUser = await adminsCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // নতুন ইউজার তৈরি
    const newUser = {
      fullname,
      email,
      username,
      password,
      role: "User", // ডিফল্ট
      balance: 0, // নতুন ইউজারের জন্য 0 ব্যালেন্স
      status: "Activated", // ডিফল্ট স্ট্যাটাস
      loginStatus: "self-login", // নতুন ইউজার নিজে সাইন আপ করছে
      joinedAt: new Date().toLocaleString(), // যোগ দেওয়ার সময়
      lastLogin: new Date().toLocaleString(), // সর্বশেষ লগইন টাইম
    };

    await adminsCollection.insertOne(newUser);

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Deposit Settings (for user website)
app.get("/api/deposit/settings", async (req, res) => {
  try {
    const settings = await depositSettingsCollection.findOne({});
    res.json(settings || {}); // যদি ডেটা না থাকে, খালি অবজেক্ট ফেরত দেবে
  } catch (error) {
    res.status(500).json({ message: "Error fetching deposit settings", error });
  }
});

// ✅ Upload Payment Method Image
app.post(
  "/api/upload/payment-image",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded!" });
      }

      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.json({ imageUrl }); // frontend-এ এই URL পাঠাবে
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ message: "Error uploading image", error });
    }
  }
);

app.post("/api/deposit/settings", async (req, res) => {
  try {
    const data = req.body;
    console.log("🟡 Received Deposit Settings:", data);

    // Remove _id field
    const { _id, ...cleanData } = data;

    await depositSettingsCollection.updateOne(
      {},
      { $set: cleanData },
      { upsert: true }
    );

    res.json({ message: "Deposit settings saved successfully!" });
  } catch (error) {
    console.error("❌ Deposit Settings Save Error:", error);
    res
      .status(500)
      .json({ message: "Error saving deposit settings", error: error.message });
  }
});

// Get deposit settings
app.get("/api/deposit-payment/settings", async (req, res) => {
  try {
    const settings = await depositSettingsCollection.findOne();
    if (!settings) {
      return res.status(404).json({ error: "Deposit settings not found" });
    }
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching deposit settings" });
  }
});

// Get all payment methods
app.get("/api/deposit/methods", async (req, res) => {
  try {
    const methods = await depositSettingsCollection
      .find({ id: { $ne: "settings" } }, { projection: { _id: 0 } })
      .toArray();
    res.json(methods);
  } catch (err) {
    console.error("Error fetching payment methods:", err);
    res.status(500).json({ error: "Error fetching payment methods" });
  }
});

// Get specific payment method by ID
app.get("/api/deposit/method/:id", async (req, res) => {
  try {
    const method = await depositSettingsCollection.findOne(
      { id: req.params.id },
      { projection: { _id: 0 } }
    );
    if (!method) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.json(method);
  } catch (err) {
    console.error("Error fetching payment method:", err);
    res.status(500).json({ error: "Error fetching payment method" });
  }
});

// Create new payment method
app.post("/api/deposit/method", async (req, res) => {
  try {
    const methodData = req.body;
    const existingMethod = await depositSettingsCollection.findOne({
      id: methodData.id,
    });
    if (existingMethod) {
      return res
        .status(400)
        .json({ error: "Payment method ID already exists" });
    }
    const result = await depositSettingsCollection.insertOne({
      ...methodData,
      createdAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Payment method created", id: result.insertedId });
  } catch (err) {
    console.error("Error creating payment method:", err);
    res.status(500).json({ error: "Error creating payment method" });
  }
});

// Update payment method
app.put("/api/deposit/method/:id", async (req, res) => {
  try {
    const methodData = req.body;
    // Explicitly exclude _id from the update payload
    delete methodData._id;
    const result = await depositSettingsCollection.updateOne(
      { id: req.params.id },
      { $set: { ...methodData, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.json({ message: "Payment method updated" });
  } catch (err) {
    console.error("Error updating payment method:", err);
    res
      .status(500)
      .json({ error: "Error updating payment method", details: err.message });
  }
});

// Delete payment method
app.delete("/api/deposit/method/:id", async (req, res) => {
  try {
    const result = await depositSettingsCollection.deleteOne({
      id: req.params.id,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.json({ message: "Payment method deleted" });
  } catch (err) {
    console.error("Error deleting payment method:", err);
    res.status(500).json({ error: "Error deleting payment method" });
  }
});

// Upload deposit logo
app.post(
  "/api/deposit/upload-logo",
  upload.single("logo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }
      const logoUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.json({ logoUrl });
    } catch (err) {
      console.error("Image upload error:", err);
      res.status(500).json({ error: "Error uploading image" });
    }
  }
);

// নতুন রুটস অ্যাড করুন run() ফাংশনের পরে

// Settings API
app.get("/api/deposit-payment/settings", async (req, res) => {
  try {
    const settings = await depositSettingsCollection.findOne(); // Assuming one document
    if (!settings.promotions) settings.promotions = [];
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching settings" });
  }
});

// Submit Deposit (NaN চেক অ্যাড করা)
app.post("/api/deposit/submit", async (req, res) => {
  try {
    const {
      userId,
      transactionId,
      number,
      paymentMethod,
      paymentType,
      amount,
      currency,
      promotion,
      pbuAmount,
      bonusPBU,
      totalPBU,
    } = req.body;

    // Parse এবং NaN চেক
    const parsedAmount = parseFloat(amount);
    const parsedPbuAmount = parseFloat(pbuAmount);
    const parsedBonusPBU = parseFloat(bonusPBU);
    const parsedTotalPBU = parseFloat(totalPBU);

    if (
      isNaN(parsedAmount) ||
      isNaN(parsedPbuAmount) ||
      isNaN(parsedBonusPBU) ||
      isNaN(parsedTotalPBU)
    ) {
      return res
        .status(400)
        .json({ error: "Invalid amount or calculation. Please check values." });
    }

    const result = await depositTransactionsCollection.insertOne({
      userId: new ObjectId(userId),
      transactionId,
      number,
      paymentMethod,
      paymentType,
      amount: parsedAmount, // BDT
      currency,
      promotion,
      pbuAmount: parsedPbuAmount,
      bonusPBU: parsedBonusPBU,
      totalPBU: parsedTotalPBU,
      status: "pending",
      submittedAt: new Date(),
      processedAt: null,
      processedBy: null,
    });
    res
      .status(201)
      .json({ message: "Deposit submitted", id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Confirm Deposit
app.post("/api/deposit/confirm/:id", async (req, res) => {
  try {
    const txId = req.params.id;
    const tx = await depositTransactionsCollection.findOne({
      _id: new ObjectId(txId),
    });
    if (!tx || tx.status !== "pending")
      return res.status(400).json({ error: "Invalid transaction" });

    // Update user balance
    await adminsCollection.updateOne(
      { _id: tx.userId },
      { $inc: { balance: tx.totalPBU } }
    );

    // Update transaction
    await depositTransactionsCollection.updateOne(
      { _id: new ObjectId(txId) },
      { $set: { status: "success", processedAt: new Date() } } // processedBy অ্যাড করতে চাইলে অ্যাডমিন আইডি পাস করুন
    );

    res.json({ message: "Confirmed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get User Transactions
app.get("/api/deposit/transactions", async (req, res) => {
  try {
    const { userId } = req.query;
    const transactions = await depositTransactionsCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Pending Transactions (for admin) - with user info
app.get("/api/deposit/pending", async (req, res) => {
  try {
    const pending = await depositTransactionsCollection
      .aggregate([
        { $match: { status: "pending" } },
        {
          $lookup: {
            from: "admin-collection", // users are in adminsCollection? Wait, your user data is in adminsCollection, but role: "User"
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
      ])
      .toArray();
    res.json(pending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Cancel Deposit
app.post("/api/deposit/cancel/:id", async (req, res) => {
  try {
    const txId = req.params.id;
    const tx = await depositTransactionsCollection.findOne({
      _id: new ObjectId(txId),
    });
    if (!tx || tx.status !== "pending")
      return res.status(400).json({ error: "Invalid transaction" });

    // No balance update, just status
    await depositTransactionsCollection.updateOne(
      { _id: new ObjectId(txId) },
      { $set: { status: "failed", processedAt: new Date() } }
    );

    res.json({ message: "Cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Full Deposit Transaction History (for admin) with search, pagination
app.get("/api/deposit/history", async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build query
    const query = {};
    if (search) {
      query.transactionId = { $regex: search, $options: "i" }; // Case-insensitive search by transactionId
    }

    // Get total count
    const total = await depositTransactionsCollection.countDocuments(query);

    // Aggregate to join user info
    const transactions = await depositTransactionsCollection
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "admin-collection", // Assuming users are in adminsCollection with role: "User"
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $skip: skip },
        { $limit: parseInt(limit) },
      ])
      .toArray();

    res.json({
      transactions,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: All Categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await gameCategoriesCollection.find({}).toArray();
    res.json({ success: true, data: categories });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
});

// POST: Create Category
app.post(
  "/api/categories",
  uploadSlider.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "iconImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { categoryName, providerId, providerName } = req.body;

      if (
        !categoryName ||
        !providerId ||
        !req.files?.mainImage ||
        !req.files?.iconImage
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const mainImage = req.files.mainImage[0].filename;
      const iconImage = req.files.iconImage[0].filename;

      const newCategory = {
        categoryName,
        providerId,
        providerName,
        mainImage: `/uploads/${mainImage}`,
        iconImage: `/uploads/${iconImage}`,
        createdAt: new Date(),
      };

      const result = await gameCategoriesCollection.insertOne(newCategory);
      res.status(201).json({
        success: true,
        data: { _id: result.insertedId, ...newCategory },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

// PUT: Update Category
app.put(
  "/api/categories/:id",
  uploadSlider.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "iconImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { categoryName, providerId, providerName } = req.body;

      const updateData = {
        categoryName,
        providerId,
        providerName,
        updatedAt: new Date(),
      };

      if (req.files?.mainImage?.[0]) {
        updateData.mainImage = `/uploads/${req.files.mainImage[0].filename}`;
      }
      if (req.files?.iconImage?.[0]) {
        updateData.iconImage = `/uploads/${req.files.iconImage[0].filename}`;
      }

      const result = await gameCategoriesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.json({ success: true, message: "Updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  }
);

// DELETE: Delete Category + Images
app.delete("/api/categories/:id", async (req, res) => {
  try {
    const category = await gameCategoriesCollection.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!category)
      return res.status(404).json({ success: false, message: "Not found" });

    // Delete images from server
    if (category.mainImage) {
      const mainPath = path.join(__dirname, category.mainImage);
      if (fs.existsSync(mainPath)) fs.unlinkSync(mainPath);
    }
    if (category.iconImage) {
      const iconPath = path.join(__dirname, category.iconImage);
      if (fs.existsSync(iconPath)) fs.unlinkSync(iconPath);
    }

    await gameCategoriesCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

// GET Selected Games
app.get("/api/selected-games", async (req, res) => {
  try {
    const games = await selectedGamesCollection.find({}).toArray();
    res.json({ success: true, data: games });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch selected games" });
  }
});

// POST Select Game with Image and rowSpan
app.post(
  "/api/selected-games",
  uploadSlider.single("image"),
  async (req, res) => {
    try {
      const { gameId, gameUuid, rowSpan } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!gameId || !gameUuid) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newSelected = {
        gameId,
        gameUuid,
        image,
        rowSpan: parseInt(rowSpan) || 1,
        createdAt: new Date(),
      };

      const result = await selectedGamesCollection.insertOne(newSelected);
      res.status(201).json({
        success: true,
        data: { _id: result.insertedId, ...newSelected },
      });
    } catch (err) {
      res.status(500).json({ message: "Failed to add game" });
    }
  }
);

// PUT Update Selected Game (image, rowSpan)
app.put(
  "/api/selected-games/:id",
  uploadSlider.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { rowSpan } = req.body;
      const updateData = {
        rowSpan: parseInt(rowSpan) || 1,
        updatedAt: new Date(),
      };

      if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
      }

      const result = await selectedGamesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Selected game not found" });
      }

      const updated = await selectedGamesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ message: "Failed to update" });
    }
  }
);

// DELETE Selected Game
app.delete("/api/selected-games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const game = await selectedGamesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (game.image) {
      const imagePath = path.join(__dirname, game.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await selectedGamesCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true, message: "Game removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
});

app.put("/api/change-password/user", async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await adminsCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    await adminsCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: newPassword } }
    );

    res.json({ success: true, message: "Password changed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/callback
app.post("/api/callback", async (req, res) => {
  try {
    const {
      account_id,
      username: rawUsername,
      provider_code,
      amount,
      game_code,
      verification_key,
      bet_type,
      transaction_id,
      times,
    } = req.body;

    console.log("Callback received:", req.body);

    // Required fields
    if (!rawUsername || !provider_code || amount === undefined || !bet_type || !transaction_id) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Clean username (user45 → user)
    const cleanUsername = rawUsername.replace(/[0-9]+$/, "").trim();
    if (!cleanUsername) {
      return res.status(400).json({ success: false, message: "Invalid username format" });
    }

    // Find user
    const player = await adminsCollection.findOne({ username: cleanUsername });
    if (!player) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        searched: cleanUsername,
        original: rawUsername,
      });
    }

   

    const amountFloat = parseFloat(amount);
    if (isNaN(amountFloat) || amountFloat < 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    // Balance change logic
    let balanceChange = 0;
    let status = "lost";

    if (bet_type === "BET") {
      balanceChange = -amountFloat;           // হারলে টাকা কাটা
    } else if (bet_type === "SETTLE") {
      balanceChange = amountFloat;            // জিতলে টাকা যোগ
      status = "won";
    } else if (bet_type === "CANCEL" || bet_type === "REFUND") {
      balanceChange = amountFloat;            // বাতিল হলে ফেরত
      status = "refunded";
    }

    const newBalance = Number((player.balance || 0) + balanceChange).toFixed(2);

    // Game record
    const gameRecord = {
      provider_code: provider_code.toUpperCase(),
      game_code,
      bet_type,
      amount: amountFloat,
      transaction_id,
      verification_key: verification_key || null,
      times: times || null,
      status,
      createdAt: new Date(),
    };

    // Update user: balance + push gameHistory
    const result = await adminsCollection.updateOne(
      { _id: player._id },
      {
        $set: { balance: parseFloat(newBalance) },
        $push: { gameHistory: gameRecord },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ success: false, message: "Failed to update balance/history" });
    }

    // Success response
    res.json({
      success: true,
      message: "Callback processed successfully",
      data: {
        username: player.username,
        previous_balance: player.balance || 0,
        change: balanceChange,
        new_balance: parseFloat(newBalance),
        transaction_id,
        status,
      },
    });

  } catch (err) {
    console.error("Callback error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// POST /api/playgame
app.post("/playgame", async (req, res) => {
  try {
    const { gameID, username: rawUsername, money } = req.body;

    if (!gameID || !rawUsername || money === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "gameID, username, money required" });
    }

    const cleanUsername = rawUsername.replace(/[0-9]+$/, "").trim();
    if (!cleanUsername)
      return res
        .status(400)
        .json({ success: false, message: "Invalid username" });

    const player = await adminsCollection.findOne({ username: cleanUsername });
    if (!player)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const moneyFloat = parseFloat(money);
    if (isNaN(moneyFloat) || moneyFloat <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    if ((player.balance || 0) < moneyFloat) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient balance" });
    }

    // Oracle API থেকে game_uuid নাও
    const oracleRes = await axios.get(
      `https://apigames.oracleapi.net/api/games/${gameID}`,
      {
        headers: {
          "x-api-key":
            "b4fb7adb955b1078d8d38b54f5ad7be8ded17cfba85c37e4faa729ddd679d379",
        },
        timeout: 10000,
      }
    );

    const gameData = oracleRes.data.data;
    if (!gameData || !gameData.game_uuid) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Game not found or missing game_uuid",
        });
    }

    // CrazyBet99 API কল
    const postData = {
      home_url: "https://cp666.live",
      token: "e9a26dd9196e51bb18a44016a9ca1d73",
      username: cleanUsername + "45", // তোমার সিস্টেম অনুযায়ী
      money: moneyFloat,
      gameUid: gameData.game_uuid,
    };

    const response = await axios.post(
      "https://crazybet99.com/getgameurl",
      qs.stringify(postData),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-dstgame-key": postData.token,
        },
        timeout: 15000,
      }
    );

    const gameUrl =
      response.data.url || response.data.game_url || response.data;
    if (!gameUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to get game URL" });
    }

    // Balance কমিয়ে দাও (BET এর মতো)
    const newBalance = Number((player.balance || 0) - moneyFloat).toFixed(2);

    await adminsCollection.updateOne(
      { _id: player._id },
      { $set: { balance: parseFloat(newBalance) } }
    );

    // Optional: BET রেকর্ড সেভ করো (transaction_id দরকার হলে)
    await gameHistoryCollection.insertOne({
      username: player.username,
      provider_code: gameData.provider?.code || "UNKNOWN",
      game_code: gameData.game_code || gameID,
      bet_type: "BET",
      amount: moneyFloat,
      transaction_id: `manual_${Date.now()}_${player._id}`,
      status: "lost", // পরে SETTLE আসলে আপডেট হবে
      createdAt: new Date(),
    });

    res.json({
      success: true,
      gameUrl,
      gameName: gameData.name || "Unknown Game",
      provider: gameData.provider?.name || "Unknown",
      deducted: moneyFloat,
      new_balance: parseFloat(newBalance),
    });
  } catch (err) {
    console.error("PlayGame error:", err.message);
    res.status(500).json({ success: false, message: "Failed to launch game" });
  }
});

// ================= START SERVER =================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
