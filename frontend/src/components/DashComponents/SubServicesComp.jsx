import React from 'react';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Heading } from '../Heading/Heading';

export default function SubServicesComp({ otherservicesData }) {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="w-full flex justify-center text-center items-center">
        <Heading
          type="dark"
          smallTitle="Other AI Services"
          title="Empowering Business with AI-enabled Solutions"
          subText={
            'Right from the system to the data center, and from on-premises to the cloud, experience our AI-enabled solutions at each milestone of the digital transformation.'
          }
          classes="items-center"
        />
      </div>
      <div className="grid grid-cols-3">
        {otherservicesData?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-2xl p-6 w-full max-w-xs"
          >
            <img
              src={item.otherservicesInput1}
              alt={item.otherservicesInput2}
              className="rounded-xl object-cover w-full h-56"
            />
            <h2 className="text-center text-lg font-semibold text-gray-800 mt-4">
              {item.otherservicesInput2}
            </h2>
            <div className="mt-3">
              <PrimaryButton
                title={'Know MOre'}
                link={item.otherservicesInput4}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
