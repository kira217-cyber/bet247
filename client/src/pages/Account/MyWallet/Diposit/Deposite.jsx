import React from "react";
import DesktopDeposit from "./Components/DesktopDeposit";
import MobileDeposit from "./Components/MobileDeposit";

const Deposit = () => {
  return (
    <div>
      <div className="hidden md:block mt-28">
        <DesktopDeposit></DesktopDeposit>
      </div>
      <div className="md:hidden mt-12">
        <MobileDeposit></MobileDeposit>
      </div>
    </div>
  );
};

export default Deposit;
