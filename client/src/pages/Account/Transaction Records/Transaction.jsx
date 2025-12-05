import React from 'react';
import DesktopTransaction from './Components/DesktopTransaction';


const Transaction = () => {
    return (
         <div>
      <div className="hidden md:block mt-28">
        <DesktopTransaction></DesktopTransaction>
   
      </div>
      <div className="md:hidden mt-12">
        Mobile Transaction
      </div>
    </div>
    );
};

export default Transaction;