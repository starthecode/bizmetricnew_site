import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { LeftCard } from './LeftCard';

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import MarqueeBanner from '../MarqueeBanner';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

export default function AnimatedSlider({ data }) {
  return (
    <section
      className="relative py-0 sm:py-0 md:pt-24 lg:pt-24 xl:pt-28 overflow-hidden z-10"
      style={{
        backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="h-full container mt-6 px-0">
        <div className="relative overflow-hidden">
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            speed={2000}
            effect="fade"
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            pagination={true}
            modules={[Navigation, Pagination, Autoplay, EffectFade]} // ✅ include Autoplay
            className="mySwiper"
          >
            {/* <div className="absolute z-10 inset-0 w-full h-full bg-gradient-to-tr from-black to-transparent" /> */}
            {data.map((item, index) => (
              <SwiperSlide
                className={`keen-slider__slide item ${
                  item?.addVideo ? 'mt-28' : ''
                } p-10 border-t border-t-junglegreen-500`}
                key={index}
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5), rgba(0,0,0,0.0)), url(${item?.sliderImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: 'auto',
                }}
              >
                <div className="grid h-full items-start w-full max-w-3xl relative z-20">
                  <div className="flex h-full flex-col items-center col-span-2 justify-center mt-0 sm:mt-8 md:mt-0 lg:mt-0 lg:items-start">
                    <LeftCard item={item} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Prev/Next Buttons */}
          <div className="swiper_buttons custom-prev  absolute top-1/2 -left-16 transform -translate-y-1/2 z-30 cursor-pointer">
            <button className="text-white bg-junglegreen-500 px-3 py-2 rounded-full">
              <IoMdArrowRoundBack size={15} />
            </button>
          </div>
          <div className="swiper_buttons custom-next absolute top-1/2 -right-16 transform -translate-y-1/2 z-30 cursor-pointer">
            <button className="text-white bg-junglegreen-500 px-3 py-2 rounded-full">
              <IoMdArrowRoundForward size={15} />
            </button>
          </div>
        </div>
      </div>
      <MarqueeBanner />
    </section>
  );
}
