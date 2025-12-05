import React from 'react';
import { Outlet } from 'react-router';
import VIP from '../pages/Account/VIP/VIP';

const VIPLayout = () => {
    return (
        <div>
            <VIP></VIP>
            <Outlet></Outlet>
        </div>
    );
};

export default VIPLayout;