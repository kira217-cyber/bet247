import React from "react";
import DesktopWithdraw from "./Components/DesktopWithdraw";
import MobileWithdraw from "./Components/MobileWithdraw";

const Withdraw = () => {
  return (
    <div>
      <div className="hidden md:block mt-28">
        <DesktopWithdraw></DesktopWithdraw>
      </div>
      <div className="md:hidden mt-12">
        <MobileWithdraw></MobileWithdraw>
      </div>
    </div>
  );
};

export default Withdraw;
