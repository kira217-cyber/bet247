import React from 'react';
import NavbarControl from '../../components/NavbarControl/NavbarControl';
import WebMenuControl from '../../components/WebMenuControl/WebMenuControl';
import MobileMenuControl from '../../components/MobileMenuControl/MobileMenuControl';
import MobileSideBarControl from '../../components/MobileSidebarControl/MobileSidebarControl';
import FooterControl from '../../components/FooterControl/FooterControl';
import SocialMediaUrlControl from '../../components/SocialMediaUrlControl/SocialMediaUrlControl';

const ColorControl = () => {
    return (
        <div className='grid gap-6 grid-cols-1 lg:grid-cols-4'>
            <NavbarControl></NavbarControl>
            <WebMenuControl></WebMenuControl>
            <MobileMenuControl></MobileMenuControl>
            <MobileSideBarControl></MobileSideBarControl>
            <FooterControl></FooterControl>
            <SocialMediaUrlControl></SocialMediaUrlControl>
        </div>
    );
};

export default ColorControl;