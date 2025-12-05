import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DepositPaymentSetting = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    logo: "",
    companyName: "",
    bgColor: "#f7f8fc",
    formBgColor: "#e2136e",
    transactionId: "",
    transactionNumber: "",
    transactionIdLabel: "ট্রানজেকশন আইডি দিন",
    transactionIdHint: "দয়া করে আপনার ট্রানজেকশন আইডি দিন",
    numberLabel: "লেনদেন নম্বর লিখুন",
    numberHint: "দয়া করে আপনার লেনদেন নম্বর দিন",
    instructions: [
      { text: "*247# ডায়াল করে আপনার মোবাইল মেনুতে যান অথবা অ্যাপে যান", isNumber: false },
      { text: '"Cash Out"-এ ক্লিক করুন।', isNumber: false },
      { text: "প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুন", isNumber: true },
      { text: "টাকার পরিমাণঃ", isNumber: false },
      { text: "নিশ্চিত করতে এখন আপনার মোবাইল মেনু পিন লিখুন।", isNumber: false },
      { text: "সবকিছু ঠিক থাকলে, আপনি একটি নিশ্চিতকরণ বার্তা পাবেন।", isNumber: false },
      { text: "খন উপরের বক্সে আপনার Transaction ID দিন এবং নিচের VERIFY বাটনে ক্লিক করুন।", isNumber: false },
    ],
    submitButtonText: "যাচাই করুন",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch payment methods
  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/deposit/methods`);
      setPaymentMethods(res.data.filter((method) => method.id !== "settings"));
    } catch (err) {
      console.error("Error fetching payment methods:", err);
      toast.error("পেমেন্ট মেথড লোড করতে ব্যর্থ!");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle logo file change
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("ইমেজ সাইজ 5MB এর বেশি হতে পারবে না!");
      return;
    }
    setLogoFile(file);
  };

  // Handle instruction change
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index].text = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  // Upload logo
  const uploadLogo = async () => {
    if (!logoFile) return formData.logo;
    const formDataToSend = new FormData();
    formDataToSend.append("logo", logoFile);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/deposit/upload-logo`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.logoUrl;
    } catch (err) {
      console.error("Error uploading logo:", err);
      toast.error("লোগো আপলোড করতে ব্যর্থ!");
      return formData.logo;
    }
  };

  // Add or update payment method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const logoUrl = await uploadLogo();
      // Explicitly exclude _id from the payload
      const { _id, ...updatedFormData } = { ...formData, logo: logoUrl };

      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/deposit/method/${formData.id}`, updatedFormData);
        toast.success("পেমেন্ট মেথড আপডেট করা হয়েছে!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/deposit/method`, updatedFormData);
        toast.success("নতুন পেমেন্ট মেথড যোগ করা হয়েছে!");
      }

      // Reset form
      setFormData({
        id: "",
        name: "",
        logo: "",
        companyName: "",
        bgColor: "#f7f8fc",
        formBgColor: "#e2136e",
        transactionId: "",
        transactionNumber: "",
        transactionIdLabel: "ট্রানজেকশন আইডি দিন",
        transactionIdHint: "দয়া করে আপনার ট্রানজেকশন আইডি দিন",
        numberLabel: "লেনদেন নম্বর লিখুন",
        numberHint: "দয়া করে আপনার লেনদেন নম্বর দিন",
        instructions: [
          { text: "*247# ডায়াল করে আপনার মোবাইল মেনুতে যান অথবা অ্যাপে যান", isNumber: false },
          { text: '"Cash Out"-এ ক্লিক করুন।', isNumber: false },
          { text: "প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুন", isNumber: true },
          { text: "টাকার পরিমাণঃ", isNumber: false },
          { text: "নিশ্চিত করতে এখন আপনার মোবাইল মেনু পিন লিখুন।", isNumber: false },
          { text: "সবকিছু ঠিক থাকলে, আপনি একটি নিশ্চিতকরণ বার্তা পাবেন।", isNumber: false },
          { text: "খন উপরের বক্সে আপনার Transaction ID দিন এবং নিচের VERIFY বাটনে ক্লিক করুন।", isNumber: false },
        ],
        submitButtonText: "যাচাই করুন",
      });
      setIsEditing(false);
      setLogoFile(null);
      await fetchPaymentMethods();
    } catch (err) {
      console.error("Error saving payment method:", err);
      const errorMessage = err.response?.data?.details || "পেমেন্ট মেথড সংরক্ষণ করতে ব্যর্থ!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Edit payment method
  const handleEdit = (method) => {
    // Ensure _id is not included in formData
    const { _id, ...methodWithoutId } = method;
    setFormData(methodWithoutId);
    setIsEditing(true);
    setLogoFile(null);
  };

  // Delete payment method
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/deposit/method/${id}`);
      toast.success("পেমেন্ট মেথড মুছে ফেলা হয়েছে!");
      await fetchPaymentMethods();
    } catch (err) {
      console.error("Error deleting payment method:", err);
      toast.error("পেমেন্ট মেথড মুছতে ব্যর্থ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-md shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6">অ্যাডমিন ড্যাশবোর্ড - পেমেন্ট মেথড ম্যানেজমেন্ট</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "পেমেন্ট মেথড এডিট করুন" : "নতুন পেমেন্ট মেথড যোগ করুন"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">মেথড আইডি</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="যেমন: bkash, nagad, rocket"
              disabled={isEditing}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">নাম</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="যেমন: bKash"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">লোগো আপলোড</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="w-full p-2 border rounded-md"
              disabled={loading}
            />
            {formData.logo && (
              <img src={formData.logo} alt="Preview" className="mt-2 w-24 h-24 object-contain" />
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">কোম্পানির নাম</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="যেমন: a BRAC Bank company"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">ব্যাকগ্রাউন্ড কালার</label>
            <input
              type="color"
              name="bgColor"
              value={formData.bgColor}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">ফর্ম ব্যাকগ্রাউন্ড কালার</label>
            <input
              type="color"
              name="formBgColor"
              value={formData.formBgColor}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">ট্রানজেকশন আইডি</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="যেমন: 68e54a6428226f8b4a20a102"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">লেনদেন নম্বর</label>
            <input
              type="text"
              name="transactionNumber"
              value={formData.transactionNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="যেমন: 01875342131"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">ট্রানজেকশন আইডি লেবেল</label>
            <input
              type="text"
              name="transactionIdLabel"
              value={formData.transactionIdLabel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="ট্রানজেকশন আইডি লেবেল"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">ট্রানজেকশন আইডি হিন্ট</label>
            <input
              type="text"
              name="transactionIdHint"
              value={formData.transactionIdHint}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="ট্রানজেকশন আইডি হিন্ট"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">লেনদেন নম্বর লেবেল</label>
            <input
              type="text"
              name="numberLabel"
              value={formData.numberLabel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="লেনদেন নম্বর লেবেল"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">লেনদেন নম্বর হিন্ট</label>
            <input
              type="text"
              name="numberHint"
              value={formData.numberHint}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="লেনদেন নম্বর হিন্ট"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">সাবমিট বাটন টেক্সট</label>
            <input
              type="text"
              name="submitButtonText"
              value={formData.submitButtonText}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="যেমন: যাচাই করুন"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-1">ইনস্ট্রাকশনস</label>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={instruction.text}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder={`ইনস্ট্রাকশন ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "প্রসেসিং..." : isEditing ? "আপডেট করুন" : "যোগ করুন"}
        </button>
      </form>

      {/* Payment Methods List */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">পেমেন্ট মেথড তালিকা</h2>
        {loading ? (
          <div className="text-center">লোড হচ্ছে...</div>
        ) : paymentMethods.length === 0 ? (
          <div className="text-center">কোনো পেমেন্ট মেথড পাওয়া যায়নি</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">নাম</th>
                <th className="border p-2">লোগো</th>
                <th className="border p-2">কোম্পানি</th>
                <th className="border p-2">লেনদেন নম্বর</th>
                <th className="border p-2">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.map((method) => (
                <tr key={method.id} className="border">
                  <td className="border p-2">{method.name}</td>
                  <td className="border p-2">
                    <img src={method.logo} alt={method.name} className="w-12 h-12 object-contain" />
                  </td>
                  <td className="border p-2">{method.companyName}</td>
                  <td className="border p-2">{method.transactionNumber}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(method)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded-md mr-2 hover:bg-yellow-500"
                      disabled={loading}
                    >
                      এডিট
                    </button>
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      disabled={loading}
                    >
                      মুছুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DepositPaymentSetting;