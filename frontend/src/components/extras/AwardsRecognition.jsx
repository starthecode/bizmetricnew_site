import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { BiSolidQuoteLeft } from 'react-icons/bi';
import GlowLight from './GlowLight';
import { Heading } from '../Heading/Heading';

export default function AwardsRecognition({ data }) {
  const url = import.meta.env.VITE_BACKEND_PUBLIC_URL;

  return (
    <section className="py-28 container">
      {' '}
      <div className="mb-16">
        <GlowLight classes="top-1/1 right-0 bg-junglegreen-500/40" />
        <div className="flex items-center justify-center w-full">
          <Heading
            type="dark"
            smallTitle={data?.title}
            title={data?.subtitle}
            subText={data?.extratext}
            classes="items-center text-center max-w-3xl"
          />
        </div>
      </div>
      <div className="relative flex items-center justify-center mx-auto container h-[280px] px-80">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="!overflow-visible"
        >
          {data?.items?.map((slide, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className={`relative shadow-xl rounded-2xl w-fit h-[200px] px-6 py-5 text-center transition-all duration-500 ${
                    isActive
                      ? 'scale-125 bg-white'
                      : 'opacity-20 bg-woodsmoke-400'
                  }`}
                >
                  {/* Profile Image */}
                  <div className="relative flex flex-col justify-center items-center overflow-hidden">
                    <img
                      src={`${url}/uploads/1750576848525-awards-badge3345.webp`}
                      alt={slide.threeboxesinput2}
                      className={`w-36 h-32 ${
                        isActive ? 'border-white' : 'border-white/20'
                      }`}
                    />

                    {/* Centered Feedback Text */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <p className="leading-relaxed font-semibold text-xs text-center text-white">
                        {slide.threeboxesinput1}
                      </p>
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="mt-0">
                    <h4
                      className={`text-sm capitalize font-semibold text-junglegreen-500`}
                    >
                      {slide.threeboxesinput2}
                    </h4>
                    <p className="text-xs text-woodsmoke-500 font-semibold capitalize">
                      {slide.threeboxesinput3}
                    </p>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
