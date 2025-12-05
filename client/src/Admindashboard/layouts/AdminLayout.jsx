import React from 'react';
import AdNavbar from '../components/AdminNavbar/AdNavbar';
import { Outlet } from 'react-router';


const AdminLayout = () => {
    return (
        <div>
            <AdNavbar></AdNavbar>
            <Outlet></Outlet>
        </div>
    )
}

export default AdminLayout;