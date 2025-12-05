import React from 'react';
import { Outlet } from 'react-router';

const BillingLayout = () => {
    return (
        <div className='mt-12 lg:mt-28'>
            <Outlet />
        </div>
    );
};

export default BillingLayout;