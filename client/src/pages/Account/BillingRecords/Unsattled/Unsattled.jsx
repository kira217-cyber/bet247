import React from 'react';
import DesktopBilling from './Components/DesktopBilling';
import MobileBilling from './Components/MobileBilling';

const Unsattled = () => {
    return (
        <div>
      <div className="hidden md:block mt-28">
        <DesktopBilling></DesktopBilling>
      </div>
      <div className="md:hidden mt-12">
        <MobileBilling></MobileBilling>
      </div>
    </div>
    );
};

export default Unsattled;