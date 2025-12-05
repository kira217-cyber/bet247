import React, { useState } from "react";

const AdminSetting = () => {
  const [currency, setCurrency] = useState("USDT");
  const [active, setActive] = useState("Active");
  // ইনপুটগুলোর নাম লিস্ট আকারে রাখলাম যাতে কোড রিপিট না হয়
  const fields = [
    { label: "All User Bonus add:" },
    { label: "Monthly sub admin Bonus:" },
    { label: "Change Mother Admin User ID:" },
    { label: "Monthly sub Master Bonus:" },
    { label: "Monthly Sub Supper Bonus:" },
  ];
  const fields2 = [
    { label: "Monthly sub admin Bonus:" },
    { label: "Change Mother Admin Password:" },
    { label: "Whats App Number:" },
    { label: "Telegram Link:" },
    { label: "Facebook Link:" },
  ];
  return (
    <div className="bg-[#e6dfcf] flex flex-col items-center">
      {/* Title */}
      <h2 className="bg-yellow-400 text-black font-bold text-xl md:text-2xl px-6 py-2 w-full text-center">
        Admin Setting
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20">
        <div className=" flex justify-center p-4">
          <div className="w-full rounded-lg p-4 space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="font-bold text-sm">{field.label}</label>
                <div className="flex">
                  <input
                    type="number"
                    defaultValue={0}
                    className="flex-1 border bg-white rounded-l-md px-2 py-1 focus:outline-none"
                  />
                  <button className="bg-yellow-600 text-white font-semibold px-4 rounded-r-md hover:bg-yellow-700">
                    Add+
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex justify-center p-4">
          <div className="w-full rounded-lg  space-y-4 p-4">
            {/* Monthly sub master Bonus */}
            <div className="flex flex-col space-y-1">
              <label className="font-bold text-sm">
                Monthly sub master Bonus:
              </label>
              <div className="flex">
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full border bg-white rounded-l-md px-2 py-1 focus:outline-none"
                />
                <button className="bg-yellow-600 text-white font-semibold px-4 rounded-r-md hover:bg-yellow-700">
                  Add+
                </button>
              </div>
            </div>

            {/* Monthly senior Supper Bonus */}
            <div className="flex flex-col space-y-1">
              <label className="font-bold text-sm">
                Monthly senior Supper Bonus:
              </label>
              <div className="flex">
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full border bg-white rounded-l-md px-2 py-1 focus:outline-none"
                />
                <button className="bg-yellow-600 text-white font-semibold px-4 rounded-r-md hover:bg-yellow-700">
                  Add+
                </button>
              </div>
            </div>

            {/* Currency Set */}
            <div className="flex flex-col space-y-1 ">
              <label className="font-bold text-sm">Currency Set:</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border bg-white rounded-md px-2 py-1 focus:outline-none text-purple-700 font-bold"
              >
                <option value="USDT" className="bg-yellow-400 font-semibold">
                  USDT
                </option>
                <option value="BDT" className="bg-yellow-400 font-semibold">
                  BDT
                </option>
                <option value="PVU" className="bg-yellow-400 font-semibold">
                  PVU
                </option>
              </select>
            </div>

            {/* Currency Set */}
            <div className="flex flex-col space-y-1">
              <label className="font-bold text-sm ">
                Site Maintain Mood:
              </label>
              <select
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="w-full border bg-white rounded-md px-2 py-1 focus:outline-none text-purple-700 font-bold"
              >
                <option value="Active" className="bg-yellow-400 font-semibold">
                  Active
                </option>
                <option
                  value="Inactive"
                  className="bg-yellow-400 font-semibold"
                >
                  Inactive
                </option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-bold text-sm">Site Title:</label>
              <div className="flex">
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full border bg-white rounded-l-md px-2 py-1 focus:outline-none"
                />
                <button className="bg-yellow-600 text-white font-semibold px-4 rounded-r-md hover:bg-yellow-700">
                  Add+
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <div className="w-full rounded-lg p-4 space-y-4">
            {fields2.map((field, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="font-bold text-sm ">{field.label}</label>
                <div className="flex">
                  <input
                    type="text"
                    defaultValue={''}
                    className="flex-1 border bg-white rounded-l-md px-2 py-1 focus:outline-none"
                  />
                  <button className="bg-yellow-600 text-white font-semibold px-4 rounded-r-md hover:bg-yellow-700">
                    Add+
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="mt-6 mb-52">
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg  hover:bg-black">
          Save Change
        </button>
      </div>
    </div>
  );
};

export default AdminSetting;
