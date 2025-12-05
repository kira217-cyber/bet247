import React from 'react';
import DesktopResetPassword from './Components/DesktopResetPassword';
import MobileResetPassword from './Components/MobileResetPassword';

const ResetPassword = () => {
    return (
       <div>
      <div className="hidden md:block mt-28">
        <DesktopResetPassword></DesktopResetPassword>
      </div>
      <div className="md:hidden mt-12">
        <MobileResetPassword></MobileResetPassword>
      </div>
    </div>
    );
};

export default ResetPassword;