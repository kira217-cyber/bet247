import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DepositFormSettings = () => {
  const [form, setForm] = useState({
    pbu_rate: 100,
    pbu_rate2: 100,
    min_amount: 100,
    max_amount: 25000,
    payment_types: ["agent", "personal"],
    promotions: [
      {
        id: 1,
        title: "Easy 5% Deposit Bonus",
        type: "Sports",
        start: "2025-06-01 02:00:00",
        end: "2026-01-01 01:59:00",
        bonusPercent: 5,
      },
    ],
    payment_methods: [],
    currencies: ["BDT", "USD"],
    currencies2: ["BDT", "USD"],
    
  });

  const [newMethod, setNewMethod] = useState({ name: "", image: "" });
  const [newCurrency, setNewCurrency] = useState("");
  const [newCurrency2, setNewCurrency2] = useState("");
  const [newPaymentType, setNewPaymentType] = useState("");
  const [newPromotion, setNewPromotion] = useState({
    id: Date.now(),
    title: "",
    type: "",
    start: "",
    end: "",
    bonusPercent: 0,
  });

  const [editMode, setEditMode] = useState(false);

  // Fetch existing settings
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/deposit/settings`)
      .then((res) => {
        if (res.data && Object.keys(res.data).length > 0) {
          setForm(res.data);
        }
      })
      .catch(() => {});
  }, []);

  // ===== Image Upload =====
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload/payment-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setNewMethod({ ...newMethod, image: res.data.imageUrl });
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Image upload failed!");
    }
  };

  // ===== Add Payment Method =====
  const handleAddMethod = () => {
    if (!newMethod.name || !newMethod.image) {
      toast.error("Please fill both name and image!");
      return;
    }
    setForm({
      ...form,
      payment_methods: [
        ...form.payment_methods,
        { id: newMethod.name.toLowerCase(), ...newMethod },
      ],
    });
    setNewMethod({ name: "", image: "" });
  };

  const handleDeleteMethod = (id) => {
    setForm({
      ...form,
      payment_methods: form.payment_methods.filter((m) => m.id !== id),
    });
  };

  // ===== Currency =====
  const handleAddCurrency = () => {
    if (!newCurrency.trim()) return toast.error("Enter currency!");
    if (form.currencies.includes(newCurrency.trim().toUpperCase()))
      return toast.warning("Currency already exists!");
    setForm({
      ...form,
      currencies: [...form.currencies, newCurrency.trim().toUpperCase()],
    });
    setNewCurrency("");
  };

  const handleDeleteCurrency = (cur) => {
    setForm({
      ...form,
      currencies: form.currencies.filter((c) => c !== cur),
    });
  };

  const handleAddCurrency2 = () => {
    if (!newCurrency2.trim()) return toast.error("Enter currency!");
    if (form.currencies2.includes(newCurrency2.trim().toUpperCase()))
      return toast.warning("Currency already exists!");
    setForm({
      ...form,
      currencies2: [...form.currencies2, newCurrency2.trim().toUpperCase()],
    });
    setNewCurrency2("");
  };

  const handleDeleteCurrency2 = (cur) => {
    setForm({
      ...form,
      currencies2: form.currencies2.filter((c) => c !== cur),
    });
  };

  // ===== Payment Types =====
  const handleAddPaymentType = () => {
    if (!newPaymentType.trim()) return toast.error("Enter payment type!");
    if (form.payment_types.includes(newPaymentType.trim()))
      return toast.warning("Payment type already exists!");
    setForm({
      ...form,
      payment_types: [...form.payment_types, newPaymentType.trim()],
    });
    setNewPaymentType("");
  };

  const handleDeletePaymentType = (pt) => {
    setForm({
      ...form,
      payment_types: form.payment_types.filter((p) => p !== pt),
    });
  };

  // ===== Promotions =====
  const handleAddPromotion = () => {
    if (!newPromotion.title.trim()) return toast.error("Enter title!");
    setForm({
      ...form,
      promotions: [...form.promotions, { ...newPromotion, id: Date.now() }],
    });
    setNewPromotion({
      id: Date.now(),
      title: "",
      type: "",
      start: "",
      end: "",
      bonusPercent: 0,
    });
  };

  const handleDeletePromotion = (id) => {
    setForm({
      ...form,
      promotions: form.promotions.filter((p) => p.id !== id),
    });
  };

  // ===== Save Settings =====
  const handleSave = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/deposit/settings`,
        form
      );
      toast.success("Settings saved successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to save settings!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 text-white p-6 rounded-lg mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-yellow-400">
          💰 Deposit Settings 
        </h1>
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 px-4 py-1 rounded font-semibold"
          >
            ✏️ Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="bg-yellow-500 text-black font-bold py-1 px-4 rounded hover:bg-yellow-400"
          >
            💾 Save Settings
          </button>
        )}
      </div>

      {/* Currency Rate 1 and Amount */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <label>Currency Rate 1</label>
          <input
            type="number"
            disabled={!editMode}
            className="w-full p-2 rounded bg-gray-700"
            value={form.pbu_rate}
            onChange={(e) =>
              setForm({ ...form, pbu_rate: parseInt(e.target.value) })
            }
          />
        </div>
        {/* Currency Rate 2 and Amount */}
        <div>
          <label>Currency Rate 2</label>
          <input
            type="number"
            disabled={!editMode}
            className="w-full p-2 rounded bg-gray-700"
            value={form.pbu_rate2}
            onChange={(e) =>
              setForm({ ...form, pbu_rate2: parseInt(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Min Amount</label>
          <input
            type="number"
            disabled={!editMode}
            className="w-full p-2 rounded bg-gray-700"
            value={form.min_amount}
            onChange={(e) =>
              setForm({ ...form, min_amount: parseInt(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Max Amount</label>
          <input
            type="number"
            disabled={!editMode}
            className="w-full p-2 rounded bg-gray-700"
            value={form.max_amount}
            onChange={(e) =>
              setForm({ ...form, max_amount: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      
      {/* ===== Payment Types ===== */}
      <div className="border-t border-gray-600 pt-4 mb-4">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">
          Payment Types
        </h2>
        {editMode && (
          <div className="flex gap-2 mb-2">
            <input
              placeholder="Add Payment Type"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newPaymentType}
              onChange={(e) => setNewPaymentType(e.target.value)}
            />
            <button
              onClick={handleAddPaymentType}
              className="bg-green-500 px-3 rounded font-semibold"
            >
              ➕ Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {form.payment_types.map((pt, i) => (
            <div
              key={i}
              className="bg-gray-700 px-3 py-1 rounded flex items-center gap-2"
            >
              <span>{pt}</span>
              {editMode && (
                <button
                  onClick={() => handleDeletePaymentType(pt)}
                  className="text-red-400 text-xs"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== First Currencies ===== */}
      <div className="border-t border-gray-600 pt-4 mb-4">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">
         First Currencies
        </h2>
        {editMode && (
          <div className="flex gap-2 mb-3">
            <input
              placeholder="Add currency (e.g., BDT)"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newCurrency}
              onChange={(e) => setNewCurrency(e.target.value)}
            />
            <button
              onClick={handleAddCurrency}
              className="bg-green-500 px-4 rounded font-semibold"
            >
              ➕ Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {form.currencies.map((cur, i) => (
            <div
              key={i}
              className="bg-gray-700 px-3 py-1 rounded flex items-center gap-2"
            >
              <span>{cur}</span>
              {editMode && (
                <button
                  onClick={() => handleDeleteCurrency(cur)}
                  className="text-red-400 text-xs"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Second Currencies */}
     
      <div className="border-t border-gray-600 pt-4 mb-4">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">
         Second Currencies
        </h2>
        {editMode && (
          <div className="flex gap-2 mb-3">
            <input
              placeholder="Add currency (e.g., BDT)"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newCurrency2}
              onChange={(e) => setNewCurrency2(e.target.value)}
            />
            <button
              onClick={handleAddCurrency2}
              className="bg-green-500 px-4 rounded font-semibold"
            >
              ➕ Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {form.currencies2.map((cur, i) => (
            <div
              key={i}
              className="bg-gray-700 px-3 py-1 rounded flex items-center gap-2"
            >
              <span>{cur}</span>
              {editMode && (
                <button
                  onClick={() => handleDeleteCurrency2(cur)}
                  className="text-red-400 text-xs"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== Promotions ===== */}
      <div className="border-t border-gray-600 pt-4 mb-4">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">
          Promotions
        </h2>
        {editMode && (
          <div className="flex flex-col gap-2 mb-3">
            <input
              placeholder="Title"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newPromotion.title}
              onChange={(e) =>
                setNewPromotion({ ...newPromotion, title: e.target.value })
              }
            />
            <input
              placeholder="Type"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newPromotion.type}
              onChange={(e) =>
                setNewPromotion({ ...newPromotion, type: e.target.value })
              }
            />
            <input
              type="datetime-local"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newPromotion.start}
              onChange={(e) =>
                setNewPromotion({ ...newPromotion, start: e.target.value })
              }
            />
            <input
              type="datetime-local"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newPromotion.end}
              onChange={(e) =>
                setNewPromotion({ ...newPromotion, end: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Bonus %"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newPromotion.bonusPercent}
              onChange={(e) =>
                setNewPromotion({
                  ...newPromotion,
                  bonusPercent: parseFloat(e.target.value),
                })
              }
            />
            <button
              onClick={handleAddPromotion}
              className="bg-yellow-500 text-black px-3 rounded font-semibold"
            >
              ➕ Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {form.promotions.map((p) => (
            <div
              key={p.id}
              className="bg-gray-700 px-3 py-1 rounded flex flex-col items-start gap-1"
            >
              <span className="font-semibold">{p.title}</span>
              <span>{p.type}</span>
              <span className="text-xs">
                {p.start} ~ {p.end}
              </span>
              <span>Bonus: {p.bonusPercent}%</span>
              {editMode && (
                <button
                  onClick={() => handleDeletePromotion(p.id)}
                  className="text-red-400 text-xs mt-1"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== PAYMENT METHODS ===== */}
      <div className="border-t border-gray-600 pt-4 mb-4">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">
          Payment Methods
        </h2>
        {editMode && (
          <div className="flex flex-col md:flex-row gap-2 mb-3">
            <input
              placeholder="Method name"
              className="flex-1 p-2 rounded bg-gray-700"
              value={newMethod.name}
              onChange={(e) =>
                setNewMethod({ ...newMethod, name: e.target.value })
              }
            />
            <input type="file" onChange={handleImageUpload} />
            <button
              onClick={handleAddMethod}
              className="bg-yellow-500 text-black px-3 rounded font-semibold"
            >
              ➕ Add
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-3">
          {form.payment_methods.map((m) => (
            <div
              key={m.id}
              className="bg-gray-700 p-3 rounded-lg flex flex-col items-center w-28"
            >
              <img src={m.image} className="w-10 h-10 object-contain mb-1" />
              <p className="text-sm">{m.name}</p>
              {editMode && (
                <button
                  onClick={() => handleDeleteMethod(m.id)}
                  className="text-red-400 text-xs mt-1"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepositFormSettings;
