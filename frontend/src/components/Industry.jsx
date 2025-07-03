import React, { useState } from 'react';

import { Heading } from './Heading/Heading';

import {
  FiTruck,
  FiSettings,
  FiActivity,
  FiHeart,
  FiSmartphone,
  FiShoppingBag,
} from 'react-icons/fi';
import { SecondaryButton } from './Buttons/SecondaryButton';
import GlowLight from './extras/GlowLight';
import SvgLine2 from './lines/SvgLine2';

const iconMap = {
  FiTruck,
  FiSettings,
  FiActivity,
  FiHeart,
  FiSmartphone,
  FiShoppingBag,
};

const contentData = {
  manufacturing: [
    {
      title: 'Cloud-based Custom Fleet Management Application',
      desc: 'We implemented real-time analytics and cloud-based...',
      image:
        'https://bizsiteuploads.blob.core.windows.net/uploads/industry-manufecturing-img.jpg',
    },
    {
      title:
        'Designing cloud-enabled environment for cost & resource efficiency',
      desc: 'We deployed the enterprise cloud solution...',
      image:
        'https://bizsiteuploads.blob.core.windows.net/uploads/industry-manufecturing-img.jpg',
    },
  ],
  logistics: [
    {
      title: 'AI-powered Logistics Optimization',
      desc: 'Streamlined delivery with predictive route planning.',
      image:
        'https://bizsiteuploads.blob.core.windows.net/uploads/industry-manufecturing-img.jpg',
    },
  ],
  // Add other tab content if needed
};

export default function Industry({ data }) {
  const [activeTab, setActiveTab] = useState('manufacturing');

  return (
    <>
      <div className="">
        <div className="flex w-full mb-10">
          <Heading
            type="dark"
            smallTitle={'We serve multiple verticals'}
            title={data?.title}
          />
        </div>
        {/* Tabs */}
        <GlowLight classes={'-left-20 bg-flamingo-600/40'} />
        <div className="ml-auto mr-auto h-full max-w-full relative z-10">
          <div className="flex gap-10 overflow-x-auto pb-4">
            {data?.items &&
              data?.items?.map((tab, index) => {
                const IconComponent = iconMap[tab.industryIcon]; // get actual icon component

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(tab.industryName)}
                    className={`px-5 py-8 w-[200px] rounded-lg shadow-sm text-center border ${
                      activeTab === tab.industryName
                        ? 'bg-junglegreen-500 border-junglegreen-200'
                        : 'bg-white'
                    } transition-all`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`text-md font-medium ${
                          activeTab === tab.industryName
                            ? 'text-white'
                            : 'text-junglegreen-500'
                        } transition-all`}
                      >
                        {IconComponent && <IconComponent size={24} />}
                      </span>
                      <span
                        className={`text-md font-medium ${
                          activeTab === tab.industryName
                            ? 'text-white'
                            : 'text-black'
                        } transition-all`}
                      >
                        {tab.industryName}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>

          {/* Content */}
          <div className="grid grid-cols-4 gap-6 h-fit">
            <div className="col-span-3 h-fit">
              <div className="grid grid-cols-2 gap-6 mt-6">
                {(contentData[activeTab] || []).map((item, index) => (
                  <div
                    key={index}
                    className="group border rounded-2xl p-4 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="absolute">
                      <SecondaryButton title={''} link={''} />
                    </div>
                    <div className="grid grid-cols-2 py-10">
                      <div>
                        <h3 className="text-md font-normal mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>{' '}
                      <div>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-xl"
                        />
                      </div>
                    </div>

                    <div />
                  </div>
                ))}
              </div>
            </div>
            <div className="group relative overflow-hidden mt-6 h-fit">
              <span className="absolute flex h-full items-center justify-center w-full">
                <div className="w-fit flex bg-white/90 px-3 rounded-lg">
                  {' '}
                  <SecondaryButton title={'Learn More'} link={''} />
                </div>
              </span>
              <img
                src="https://bizsiteuploads.blob.core.windows.net/uploads/1745383381182-learnmoreimg.webp"
                alt="learn more"
                className="w-full h-[270px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
