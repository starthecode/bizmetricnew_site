import React, { useState, useEffect } from 'react';
import { Heading } from '../../Heading/Heading';
import { SecondaryButton } from '../../Buttons/SecondaryButton';

const CompanyLocations = () => {
  const locations = {
    global: [
      { id: 'new-york', name: 'New York, USA', address: '' },
      { id: 'london', name: 'London, UK', address: '' },
      { id: 'tokyo', name: 'Tokyo, Japan', address: '' },
      { id: 'sydney', name: 'Sydney, Australia', address: '' },
    ],
    india: [
      {
        id: 'bangalore',
        name: 'Bangalore, Karnataka',
        image:
          'https://bizsiteuploads.blob.core.windows.net/uploads/1750758953465-modern-bengaluru-background.webp',
        address:
          'Bizmetric Pvt. Ltd.\nAwfis Mantri Commerce,\n7th Floor Commerce Mantri,\n12, 1 & 2, Bannerghatta Rd,\nBTM 2nd Stage, BTM Layout,\nBengaluru, Karnataka 560076',
      },
      { id: 'chandigarh', name: 'Chandigarh, Punjab', address: '' },
      { id: 'gurugram', name: 'Gurugram, Haryana', address: '' },
      { id: 'medurai', name: 'Medurai, Tamil Nadu', address: '' },
      { id: 'mohail', name: 'Mohail, Punjab', address: '' },
      { id: 'mumbai', name: 'Mumbai, Maharashtra', address: '' },
      { id: 'pune', name: 'Pune, Maharashtra', address: '' },
    ],
  };

  const [activeTab, setActiveTab] = useState('india');
  const [selectedLocation, setSelectedLocation] = useState(locations.india[0]);

  useEffect(() => {
    // Automatically set the first location in the tab as selected
    setSelectedLocation(locations[activeTab][0]);
  }, [activeTab]);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <section className="container py-24">
      <Heading
        classes={'items-center'}
        type={'dark'}
        smallTitle={'Locations'}
        title={'Our Locations'}
      />

      <div className="grid grid-cols-3 gap-8 mt-10">
        {/* Left Panel */}
        <div className="flex flex-col">
          <div className="w-full">
            {/* Tabs */}
            <div className="flex gap-5 mb-6">
              {['india', 'global'].map((tab) => (
                <button
                  key={tab}
                  className={`flex items-center capitalize px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-junglegreen-100 font-semibold border text-junglegreen-700 border-junglegreen-500'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} Locations
                </button>
              ))}
            </div>
          </div>

          {/* Locations List */}
          <div className="space-y-3 bg-white border border-1 border-woodsmoke-200 rounded-lg shadow-md  p-6">
            {locations[activeTab].map((location) => (
              <div key={location.id} className="flex items-center">
                <input
                  type="radio"
                  id={location.id}
                  name="location"
                  checked={selectedLocation.id === location.id}
                  onChange={() => handleLocationChange(location)}
                  className="h-4 w-4 text-junglegreen-500 accent-junglegreen-200 border-junglegreen-500 focus:ring-junglegreen-500"
                />
                <label
                  htmlFor={location.id}
                  className="ml-3 block text-gray-700"
                >
                  {location.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Location Details */}
        <div className="flex justify-center items-center w-full col-span-2 pt-14">
          <div className="bg-white rounded-xl shadow-lg p-5 h-fit border-b-2 border-junglegreen-600">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-flamingo-500 mb-4">
                  {selectedLocation.name}
                </h2>

                {selectedLocation.address ? (
                  <>
                    <div className="text-gray-600 mb-6">
                      {selectedLocation.address}
                    </div>
                    <SecondaryButton title={'Get Direction'} />
                    {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200">
                      Get Directions
                    </button> */}
                  </>
                ) : (
                  <p className="text-gray-500">
                    Address information coming soon.
                  </p>
                )}
              </div>
              <div>
                <img className="rounded-xl" src={selectedLocation.image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLocations;
