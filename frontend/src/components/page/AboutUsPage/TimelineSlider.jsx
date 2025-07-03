// TimelineSlider.jsx

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Heading } from '../../Heading/Heading';

const data = [
  {
    year: '2011',
    items: [],
  },
  {
    year: '2012',
    items: [],
  },
  {
    year: '2013-14',
    items: [],
  },
  {
    year: '2015',
    items: [],
  },
  {
    year: '2016-18',
    items: [
      {
        title: 'Global',
        desc: 'Partnered with major clients in the Middle East, US & Australia.',
        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'New Technologies',
        desc: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Expansion',
        desc: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    year: '2019',
    items: [],
  },
  {
    year: '2020-22',
    items: [],
  },
  {
    year: '2023',
    items: [],
  },
  {
    year: '2024–Present',
    items: [],
  },
];

export default function TimelineSlider() {
  const [selectedYear, setSelectedYear] = useState('2016-18');

  const selectedItems = data.find((d) => d.year === selectedYear)?.items || [];

  return (
    <div className="container py-40">
      <div className='max-w-5xl mb-12'>
        <Heading
          smallTitle={'Timeline'}
          title={'Our Journey Traversed So far...'}
          subText={
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
          }
        />
      </div>

      {/* Year Tabs */}
      <div className="flex justify-center flex-wrap gap-12 mb-10 text-gray-400 text-sm sm:text-base font-semibold border-b border-woodsmoke-400">
        {data.map((d, i) => (
          <button
            key={i}
            onClick={() => setSelectedYear(d.year)}
            className={`px-2 pb-1 transition duration-200 ${
              selectedYear === d.year
                ? 'text-flamingo-500 border-b-2 border-junglegreen-600'
                : 'hover:text-orange-300'
            }`}
          >
            {d.year}
          </button>
        ))}
      </div>

      {/* Swiper Slider */}
      {selectedItems.length > 0 ? (
        <Swiper
          key={selectedYear}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="flex justify-center items-center max-w-5xl gap-5 px-4"
        >
          {selectedItems.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white w-[300px] rounded-xl text-black overflow-hidden shadow-md transition hover:shadow-lg">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-orange-500 font-semibold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center text-gray-400 mt-10">
          No data available for{' '}
          <span className="text-orange-400">{selectedYear}</span>
        </div>
      )}
    </div>
  );
}
