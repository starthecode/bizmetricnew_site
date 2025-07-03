import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { MdOutlineFormatQuote } from 'react-icons/md';

const slides = [
  {
    image:
      'https://bizsiteuploads.blob.core.windows.net/uploads/work-culture-slider-img01.webp',
    text: 'Lorem Ipsum is simply dummy text of the printing andtypesetting industry.',
  },

  {
    image:
      'https://bizsiteuploads.blob.core.windows.net/uploads/work-culture-slider-img02.webp',
    text: 'Experience the power of our specific tools, which are tailored to your needs.',
  },

  {
    image:
      'https://bizsiteuploads.blob.core.windows.net/uploads/work-culture-slider-img01.webp',
    text: 'Experience the power of our specific tools, which are tailored to your needs.',
  },

  {
    image:
      'https://bizsiteuploads.blob.core.windows.net/uploads/work-culture-slider-img02.webp',
    text: 'Experience the power of our specific tools, which are tailored to your needs.',
  },
];

export const CultureSlider = () => {
  const [swiperRef, setSwiperRef] = React.useState(null);

  return (
    <div className="relative overflow-hidden px-10 h-[400px]">
      <span className="relative top-12 -left-6 z-10">
        <MdOutlineFormatQuote
          color="00a88b"
          size={60}
          className="-rotate-180"
        />{' '}
      </span>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        slidesPerView={2}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, FreeMode, Pagination]}
        className="mySwiper h-[350px]"
      >
        {slides &&
          slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="careers-slide-box text-center">
                <img
                  width={350}
                  height={350}
                  src={slide?.image}
                  alt="slider image"
                  className="object-cover"
                />
                <div className="bg-gradient-to-t from-junglegreen-500/60 via-transparent to-junglegreen-500/5 absolute inset-0"></div>
                <div className="relative bottom-[7rem] p-4">
                  <p className="!text-white font-cursive">{slide?.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
