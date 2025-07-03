import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Heading } from './Heading/Heading';
import GlowLight from './extras/GlowLight';
import BackgroundSection from './BackgroundSection';
import { BiSolidQuoteLeft } from 'react-icons/bi';

export default function FeedbackSlider({ data }) {
  return (
    <BackgroundSection>
      {' '}
      <div className="container mb-20">
        <GlowLight classes="top-1/1 right-0 bg-junglegreen-500/40" />
        <div className="flex items-center justify-center">
          <Heading
            type=""
            smallTitle={data?.title}
            title={data?.subtitle}
            subText={data?.extratext}
            classes="items-center"
          />
        </div>
      </div>
      <div className="relative mx-auto container h-[280px]">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
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
                  className={`relative shadow-xl bg-white rounded-2xl h-[200px] text-gray-800 px-6 py-5 text-center transition-all duration-500 ${
                    isActive ? '  scale-110' : 'opacity-20'
                  }`}
                >
                  {/* Profile Image */}
                  <div className="absolute left-1/2 -top-12 transform -translate-x-1/2 border-2 border-junglegreen-500/80 rounded-full">
                    <img
                      src={slide.threeboxesinput1}
                      alt={slide.threeboxesinput3}
                      className={`w-20 h-20 rounded-full border-4 ${
                        isActive ? 'border-white' : 'border-white/20'
                      }`}
                    />
                  </div>

                  {/* Feedback Text */}
                  <p className="text-sm mt-8 leading-relaxed">
                    <span className='absolute top-8 left-5'>
                      <BiSolidQuoteLeft size={50} className="fill-flamingo-500 opacity-25" />
                    </span>
                    <span className='relative z-10'>{slide.threeboxesinput2}</span>
                  </p>

                  {/* Name & Title */}
                  <div className="mt-3">
                    <h4 className={`text-sm capitalize font-semibold text-junglegreen-500`}>
                      {slide.threeboxesinput3}
                    </h4>
                    {/* <p className="text-sm text-junglegreen-600 font-semibold capitalize">
                      {slide.threeboxesinput3}
                    </p> */}
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </BackgroundSection>
  );
}
