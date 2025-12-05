import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import AllGames from '../../components/AllGames/AllGames';
import AllGames2 from '../../components/AllGames2/AllGames2';

const Home = () => {
    return (
        <div className='mt-14 lg:mt-28'>
           <HeroSection></HeroSection>
           <AllGames2></AllGames2>
           <AllGames></AllGames>
        </div>
    );
};

export default Home;