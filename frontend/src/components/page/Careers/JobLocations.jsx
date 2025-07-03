import { useState } from 'react';
import CityCard from './CityCard';
import { Heading } from '../../Heading/Heading';

const JobLocations = () => {
  const [activeTab, setActiveTab] = useState('india');

  const globalCities = [
    {
      name: 'USA',
      jobs: 0,
      image: 'bizmetric-global-office-location-0.webp',
    },

    {
      name: 'Mexico',
      jobs: 0,
      image: 'bizmetric-global-office-location-1.webp',
    },
  ];

  const indiaCities = [
    {
      name: 'Pune',
      jobs: 19,
      image: 'bizmetric-india-office-location-0.webp',
    },
    {
      name: 'Bengaluru',
      jobs: 21,
      image: 'bizmetric-india-office-location-1.webp',
    },
    {
      name: 'Mumbai',
      jobs: 20,
      image: 'bizmetric-india-office-location-2.webp',
    },

    {
      name: 'Gurgaon',
      jobs: 20,
      image: 'bizmetric-india-office-location-3.webp',
    },
    {
      name: 'Madurai',
      jobs: 17,
      image: 'bizmetric-india-office-location-4.webp',
    },
  ];

  return (
    <section className="container">
      <div className="w-full mt-20">
        <div className="mb-20">
          <Heading type={'dark'} title={'Opportunities Across Locations'} />
        </div>

        <div className="mb-12">
          <div className="flex justify-start gap-20">
            <button
              onClick={() => setActiveTab('global')}
              className={`relative text-2xl md:text-3xl font-light pb-1 transition-all duration-300 ${
                activeTab === 'global'
                   ? 'text-junglegreen-600 border-b border-junglegreen-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Global
              {activeTab === 'global' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-800 transition-all duration-300" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('india')}
              className={`relative text-2xl md:text-3xl font-light pb-1 transition-all duration-300 ${
                activeTab === 'india'
                  ? 'text-junglegreen-600 border-b border-junglegreen-600'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              India
            </button>
          </div>
        </div>

        <div className="transition-all duration-500 ease-in-out">
          {activeTab === 'global' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-10 justify-items-start">
              {globalCities.map((city, index) => (
                <CityCard
                  key={city.name}
                  name={city.name}
                  jobs={city.jobs}
                  image={city.image}
                  delay={index * 100}
                />
              ))}
            </div>
          )}

          {activeTab === 'india' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-10 justify-items-start">
              {indiaCities.map((city, index) => (
                <CityCard
                  key={city.name}
                  name={city.name}
                  jobs={city.jobs}
                  image={city.image}
                  delay={index * 100}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobLocations;
