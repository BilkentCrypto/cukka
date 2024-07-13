import React from 'react';
import Image from 'next/image';

const AboutCard = ({ logo, title, subTitle }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center w-72 shadow-lg border border-gray-300">
      <Image src={logo} alt={title} width={80} height={80} className="mb-4" />
      <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
      <p className="text-gray-700">{subTitle}</p>
    </div>
  );
};

export default AboutCard;
