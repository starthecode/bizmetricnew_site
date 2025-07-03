import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Heading } from '../Heading/Heading';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import GlowLight from './GlowLight';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Link } from 'react-router-dom';

export default function SpringSlider() {
  const slides = [
    {
      type: 'BUSINESS',
      title: 'Business Challenges you can solve with Power & Solutions',
      content: 'based on a brand model',
    },
    {
      type: 'ART 2024',
      title: 'Azure establishes vs. AWS Databricks which one should...',
    },
    {
      type: 'BUSINESS',
      title: 'Business Challenges you can solve with Power & Solutions',
      content: 'based on a brand model',
    },
    {
      type: 'ART 2024',
      title: 'Azure establishes vs. AWS D which one should...',
    },
    {
      type: 'BUSINESS',
      title: 'Business Challenges you can solve with Power & Solutions',
      content: 'based on a brand model',
    },
  ];

  return (
    <section className="relative pt-28 xl:pb-20 z-10">
      <div className="container mb-20">
        <GlowLight classes={'top-1/1 right-0 bg-junglegreen-500/40'} />
        <div className="flex text-left items-start justify-between">
          <Heading
            type="dark"
            smallTitle={'Solutions'}
            title={'Explore More Solutions'}
            classes={'items-start'}
          />

          <div className="w-full h-full">
            <div className="flex justify-end sm:justify-center md:justify-center lg:justify-center xl:justify-end mb-6">
              <PrimaryButton title={'View All'} link={'/'} />
            </div>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, FreeMode]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        freeMode={true}
        className="!overflow-visible"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link
              to={'/'}
              role="group"
              aria-roledescription="slide"
              className="min-w-0 shrink-0 grow-0 pl-0"
            >
              <div className="border text-card-foreground w-full h-fit bg-[#f2682a] rounded-[15px] shadow-[0px_4px_4px_#00000040] overflow-hidden border-none">
                <div className="relative w-full h-[250px] rounded-t-[15px] overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://c.animaapp.com/mbogi8vtaM1MUm/img/other-solutions-1.png")',
                    }}
                  >
                    <div className="absolute top-[17px] right-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-share2 w-[34px] h-[34px] text-white"
                      >
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col h-[168px] justify-between">
                    <div className="inline-flex items-end">
                      <span className="font-normal text-white text-xs leading-[14.4px] font-manrope">
                        JULY 1, 2024
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-8 w-full">
                      <div className="w-full h-14">
                        <h3 className="w-full font-semibold text-white text-lg tracking-[0.90px] leading-7 font-manrope">
                          Business Challenges you can solve with Power BI
                          Solutions
                        </h3>
                      </div>
                    </div>

                    <div className="flex w-[190px] items-center justify-between">
                      <div className="relative w-[88px] h-[26px] bg-white rounded">
                        <span className="absolute top-[7px] left-1/2 -translate-x-1/2 font-semibold text-[#f2682a] text-xs text-center leading-[14.4px] whitespace-nowrap font-manrope">
                          Healthcare
                        </span>
                      </div>
                      <div className="relative w-[88px] h-[26px] bg-white rounded">
                        <span className="absolute top-[7px] left-1/2 -translate-x-1/2 font-semibold text-[#f2682a] text-xs text-center leading-[14.4px] whitespace-nowrap font-manrope">
                          Power BI
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-end">
                      <span className="font-normal text-white text-xs leading-[14.4px] font-manrope">
                        3 MINS TO READ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
