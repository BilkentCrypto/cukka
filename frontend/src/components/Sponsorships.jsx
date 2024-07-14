import React from 'react';
import AboutCard from './AboutCard';

const Sponsorships = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-4xl mb-8 font-bold text-black">
        Technologies
      </h1>
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl px-4">
        <AboutCard
          logo="/images/chainlink.png"
          title="ChainLink"
          subTitle="Cukka uses Chainlink Functions to enable people to authenticate their social media accounts in order to claim the crypto assets (ETH & USDC)"
        />
        <AboutCard
          logo="/images/arbitrum.png"
          title="Arbitrum"
          subTitle="Arbitrum is the best choice for Cukka as a cheap, fast and secure layer. Cheap claims and transfers are crucial for the best UX on Cukka. "
        />
        <AboutCard
          logo="/images/circle.png"
          title="Circle"
          subTitle="It is important to have a fully backed digital dollar where users can receive their payments as a stablecoin without being affected by the volatility of ETH."
        />
      </div>
    </div>
  );
};

export default Sponsorships;
