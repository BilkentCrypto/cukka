import React from 'react';
import AboutCard from '../components/AboutCard';

const About = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-500 mb-10 px-8">
        Partnerships
      </h1>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl mx-auto px-4 items-center">
        <AboutCard
          logo="/images/arbitrum.png"
          title="ChainLink"
          subTitle="PerCapita utilizes Chainlink's VRF system to ensure fair and secure lotteries for NFT giveaways."
        />
        <AboutCard
          logo="/images/chainlink.png"
          title="ChainLink"
          subTitle="PerCapita utilizes Chainlink's VRF system to ensure fair and secure lotteries for NFT giveaways."
        />
        <AboutCard
          logo="/images/chainlink.png"
          title="ChainLink"
          subTitle="PerCapita utilizes Chainlink's VRF system to ensure fair and secure lotteries for NFT giveaways."
        />
      </div>
    </div>
  );
};

export default About;
