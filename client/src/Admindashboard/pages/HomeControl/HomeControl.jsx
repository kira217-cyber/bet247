import React from 'react';
import LogoControl from '../../components/LogoControl/LogoControl';
import SliderControl from '../../components/SliderControl/SliderControl';
import FavAndTitleControl from '../../components/FavAndTitleControl/FavAndTitleControl';
import SignUpControl from '../../components/SignUpControl/SignUpControl';
import LoginControl from '../../components/LoginControl/LoginControl';
import AdminLoginControl from '../../components/AdminLoginControl/AdminLoginControl';

const HomeControl = () => {
  return (
    <div>
      <LogoControl></LogoControl>
      <SliderControl></SliderControl>
      <FavAndTitleControl></FavAndTitleControl>
      <SignUpControl></SignUpControl>
      <LoginControl></LoginControl>
      <AdminLoginControl></AdminLoginControl>
    </div>
  );
};

export default HomeControl;