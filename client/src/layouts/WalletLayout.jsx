import React from "react";
import { Outlet } from "react-router";

const WalletLayout = () => {
  return (
    <div className="mt-12">
      <Outlet />
    </div>
  );
};

export default WalletLayout;
