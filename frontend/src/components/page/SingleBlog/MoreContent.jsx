import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function MoreContent({ type, moreContent = [] }) {
  useEffect(() => {
    // Ensure Swiper navigation works after mount
  }, []);

  return (
    <div className="container">
      <div className="border-t mb-5"></div>

      <div className="grid md:grid-cols-4 grid-cols-1 items-center">
        {/* Prev Button (Fixed on Left) */}
        <div>
          <div className="flex items-center justify-start">
            <button className="border border-flamingo-500/30 text-flamingo-600 rounded-md text-sm tracking-wider transition-all duration-500 hover:shadow-lg py-2 px-5 prevBtn">
              <i className="fa-solid fa-arrow-left me-2"></i> Prev Post
            </button>
          </div>
        </div>

        {/* Swiper Middle Section */}
        <div className="col-span-2">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.nextBtn',
              prevEl: '.prevBtn',
            }}
            slidesPerView={1}
            loop={true}
          >
            {moreContent.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="my-5 md:my-0">
                  <div className="flex md:justify-center justify-start items-center gap-4">
                    <img
                      alt="item feature img"
                      loading="lazy"
                      width="48"
                      height="48"
                      decoding="async"
                      className="h-12 w-12 rounded-full"
                      src={
                        item?.metaFields?.featuredImage || '/placeholder.jpg'
                      }
                    />
                    <div className="text-left">
                      <h6 className="text-sm transition-all hover:text-primary">
                        <Link to={`/${type}/${item.slug}`}>{item.title}</Link>
                      </h6>
                      {item.excerpts && (
                        <p className="text-sm text-gray-500">
                          {item.excerpts?.slice(0, 60)}...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Next Button (Fixed on Right) */}
        <div className="flex items-center md:justify-end justify-start">
          <button className="border border-flamingo-500/30 text-flamingo-600 rounded-md text-sm tracking-wider transition-all duration-500 hover:shadow-lg py-2 px-5 nextBtn">
            Next Post <i className="fa-solid fa-arrow-right ms-2"></i>
          </button>
        </div>
      </div>

      <div className="border-b mt-5"></div>
    </div>
  );
}
