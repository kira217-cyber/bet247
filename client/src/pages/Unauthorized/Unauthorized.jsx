import React from "react";

const Unauthorized = () => {
  return (
    <div className="text-center mt-10 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-red-400">❌ You are not authorized to access this page</h2>
    </div>
  );
};

export default Unauthorized;
