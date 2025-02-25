import React from 'react';
import Hero from '../../Components/Home/Hero';
import Features from '../../Components/Home/Features';
import Benefits from '../../Components/Home/Benefits';
import HowItWorks from '../../Components/Home/HowWorks';

const Home = () => {
    return (
        <div>
            <Hero />
            <Features/>
            <HowItWorks/>
            <Benefits/>
        </div>
    );
};

export default Home;