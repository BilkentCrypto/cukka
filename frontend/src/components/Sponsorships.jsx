import React from 'react';
import AboutCard from './AboutCard';

const Sponsorships = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl mb-8 font-bold text-black">
        Partnerships
      </h1>
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl px-4">
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

export default Sponsorships;
