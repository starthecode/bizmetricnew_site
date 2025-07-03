import React from 'react';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import IndustryTabButton from '../Buttons/IndustryTabButton';
import GlowLight from '../extras/GlowLight';
import {
  FiTruck,
  FiSettings,
  FiActivity,
  FiHeart,
  FiSmartphone,
  FiShoppingBag,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Heading } from '../Heading/Heading';

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

export default function IndustryAccordions() {
  const [activeTab, setActiveTab] = React.useState('manufacturing');

  const [loading, setLoading] = React.useState(true);

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/customizer/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch settings');
          return;
        }

        const contentArray = data?.customizers[0].content || [];

        const industryContent = contentArray.find(
          (item) => item.type === 'industry'
        );

        setData(industryContent?.data);
      } catch (error) {
        toast.error('An error occurred while fetching settings');
        console.error('fetchSettings error:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="h-full max-w-full px-10 sm:px-0 md:px-10 lg:px-20 xl:px-40 mt-20 pb-20 bg-white">
      <div className="flex w-full mb-10 pt-10">
        <Heading
          type="dark"
          smallTitle={'We serve multiple verticals'}
          title={data?.title}
        />
      </div>
      <GlowLight classes={'-left-20 bg-flamingo-600/40'} />
      <div className="h-full max-w-full relative z-10">
        <div className="flex gap-10 sm:gap-5 md:gap-5 lg:gap-8 overflow-x-auto pb-4">
          {data?.items &&
            data?.items?.map((tab, index) => {
              const IconComponent = iconMap[tab.industryIcon];
              return (
                <IndustryTabButton
                  key={index}
                  tab={tab}
                  index={index}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  IconComponent={IconComponent}
                />
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
                      <h3 className="text-md font-normal mb-2">{item.title}</h3>
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
              <PrimaryButton title={'Learn More'} link={'/'} />
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
  );
}
