import React from "react";

const GameApiKey = () => {
  const fields = [
    { label: "Sports Live TV Api key" },
    { label: "BetFair APIApi key" },
    { label: "Sports Radar API Key" },
    { label: "Odds Jam API Key" },
    { label: "Bet Construct API Key" },
  ];
  const fields2 = [
    { label: "Kambi API Key" },
    { label: "Pinnacle API Key" },
    { label: "SoftSwiss API Key" },
    { label: "Evolution API Key" },
    { label: "Pragmatic Play API Key" },
  ];
  const fields3 = [
    { label: "Playtech API Key" },
    { label: "etEnt API Key" },
    { label: "SABA Sports Api key" },
    { label: "OBS Api key" },
    { label: "INsports Api key" },
  ];
  return (
    <div className="bg-[#e6dfcf] flex flex-col items-center">
      {/* Title */}
      <h2 className="bg-yellow-400 text-black font-bold text-xl md:text-2xl px-6 py-2 w-full text-center">
        Game Api Key Set
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20">
        <div className=" flex justify-center p-4">
          <div className="w-full rounded-lg p-4 space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="font-bold text-sm">{field.label}</label>
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
        <div className=" flex justify-center p-4">
          <div className="w-full rounded-lg p-4 space-y-4">
            {fields2.map((field, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="font-bold text-sm">{field.label}</label>
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
        <div className=" flex justify-center p-4">
          <div className="w-full rounded-lg p-4 space-y-4">
            {fields3.map((field, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <label className="font-bold text-sm">{field.label}</label>
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

export default GameApiKey;
