import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const DepositForm = () => {
  const [settings, setSettings] = useState(null);
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/deposit-payment/settings`);
        setSettings(res.data);
        if (res.data.currencies && res.data.currencies.length > 0) {
          setSelectedCurrency(res.data.currencies[0]);
        }
      } catch (err) {
        console.error("Error fetching deposit settings:", err);
        toast.error("Settings failed to load!");
      }
    };
    fetchSettings();
  }, []);

  if (!settings) return <div className="text-center mt-10 text-white">Loading...</div>;

  const paymentOptions = settings.payment_methods || [];
  const promotions = settings.promotions || []; // Array for multiple promos
  const paymentTypes = settings.payment_types || [];
  const currencies = settings.currencies || []; // ["PBU"]
  const currencies2 = settings.currencies2 || []; // ["BDT"]
  const rate = settings.pbu_rate || 1; // 1
  const rate2 = settings.pbu_rate2 || 100; // 100

  // Safely parse amount to number
  const parsedAmount = parseFloat(amount) || 0;

  // Calculate PBU from BDT amount (prevent NaN)
  const pbuAmount = !isNaN(parsedAmount) ? (parsedAmount / rate2) * rate : 0;

  // Find selected promo
  const selectedPromo = promotions.find(p => p.id === selectedPromoId) || null;

  // Bonus in PBU (prevent NaN)
  const bonusPBU = selectedPromo && !isNaN(pbuAmount) ? (pbuAmount * selectedPromo.bonusPercent) / 100 : 0;
  const totalPBU = pbuAmount + bonusPBU;

  const handleAmountChange = (value) => {
    // Only allow valid numbers
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleQuickAdd = (value) => {
    setAmount((prev) => {
      const prevNum = parseFloat(prev) || 0;
      return (prevNum + value).toString();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (!paymentType) {
      toast.error("Please select a payment type.");
      return;
    }

    if (!selectedCurrency) {
      toast.error("Please select a currency.");
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount < settings.min_amount) {
      toast.error(`Please enter a valid amount (minimum ${settings.min_amount}).`);
      return;
    }

    // Check for NaN in calculations
    if (isNaN(pbuAmount) || isNaN(bonusPBU) || isNaN(totalPBU)) {
      toast.error("Calculation error. Please check amount and try again.");
      return;
    }

    navigate(`/deposit/${selectedMethod}`, {
      state: { 
        paymentType, 
        amount: parsedAmount, // Ensure number
        currency: currencies2[0], // BDT for payment
        promotion: selectedPromo, 
        pbuAmount, 
        bonusPBU, 
        totalPBU 
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 shadow-md rounded-md mt-8 p-5 border border-gray-700">
      {/* Top Banner */}
      <div className="bg-yellow-500 text-center text-white font-bold py-2 rounded">
        {currencies[0]} {rate} = {rate2} {currencies2[0]}
      </div>

      {/* Promotion Section - Multiple */}
      {promotions.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2 text-white">Select a Promotion</h2>
          {promotions.map((promo) => (
            <div
              key={promo.id}
              onClick={() => setSelectedPromoId(selectedPromoId === promo.id ? null : promo.id)}
              className={`border rounded-md cursor-pointer p-4 flex justify-between items-center mb-2 ${
                selectedPromoId === promo.id ? "border-orange-500 bg-black text-white" : "border-gray-300"
              }`}
            >
              <div>
                <div className="font-bold">{promo.title}</div>
                <div className="text-sm">{promo.type}</div>
                <div className="text-xs text-white">
                  {promo.start} ~ {promo.end}
                </div>
              </div>
              <input
                type="radio"
                checked={selectedPromoId === promo.id}
                onChange={() => setSelectedPromoId(promo.id)}
              />
            </div>
          ))}
          {!selectedPromoId && (
            <p className="text-red-500 text-sm mt-1">No promotion selected</p>
          )}
        </div>
      )}

      {/* Payment Method */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2 text-white">
          Select Payment Method <span className="text-red-500">*</span>
        </h2>
        <div className="flex flex-wrap gap-4">
          {paymentOptions.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-28 h-24 border rounded-md flex flex-col justify-center items-center cursor-pointer hover:shadow-md transition ${
                selectedMethod === method.id
                  ? "border-orange-500 scale-105 bg-gray-700"
                  : "border-gray-300"
              }`}
            >
              <img
                src={method.image}
                alt={method.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm font-semibold mt-1 text-white">{method.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Type Dropdown */}
      {selectedMethod && paymentTypes.length > 0 && (
        <div className="mt-5">
          <h2 className="font-semibold mb-2 text-white">
            Select Payment Type <span className="text-red-500">*</span>
          </h2>
          <select
            className="border rounded-md w-full p-2 bg-gray-700 text-white"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="">-- Select Type --</option>
            {paymentTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Amount Section */}
      <div className="mt-5">
        <div className="flex flex-wrap gap-2">
          {[25000, 20000, 15000, 10000, 5000, 1000, 500, 100].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => handleQuickAdd(v)}
              className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md font-semibold text-black"
            >
              +{v}
            </button>
          ))}
        </div>

        <div className="mt-3 flex items-center">
          <span className="font-semibold mr-2 text-white">{currencies2[0]}</span> {/* BDT */}
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="flex-1 border rounded-md p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="text-right text-sm text-white mt-1">
          {currencies2[0]} {settings.min_amount} - {settings.max_amount}
        </div>

        {/* PBU Conversion Display */}
        {amount && (
          <div className="mt-2 text-blue-400 font-medium">
            You will get {pbuAmount.toFixed(1)} {currencies[0]} for {amount} {currencies2[0]}
          </div>
        )}
      </div>

      {/* Bonus Info */}
      {selectedPromo && amount && (
        <div className="mt-3 text-green-400 font-medium">
          🎁 With {selectedPromo.bonusPercent}% bonus applied! Total: {totalPBU.toFixed(1)} {currencies[0]}
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-500 transition"
      >
        Deposit
      </button>
    </div>
  );
};

export default DepositForm;