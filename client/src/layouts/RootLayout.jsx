import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar/Navbar';
import Footer from '../components/shared/Footer/Footer';
import BottomNavbar from '../components/shared/BottomNavbar/BottomNavbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <BottomNavbar></BottomNavbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;