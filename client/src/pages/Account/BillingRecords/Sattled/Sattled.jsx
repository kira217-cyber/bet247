import React from "react";
import DesktopBilling from "./Components/DesktopBilling";
import MobileBilling from "./Components/MobileBilling";

const Sattled = () => {
  return (
    <div>
      <div className="hidden md:block mt-28">
        <DesktopBilling></DesktopBilling>
      </div>
      <div className="md:hidden mt-10">
        <MobileBilling></MobileBilling>
      </div>
    </div>
  );
};

export default Sattled;
