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
import { MasonryLayout } from './MasonryLayout';

export default function CareerSlider() {
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
    {
      type: 'BUSINESS',
      title: 'Business Challenges you can solve with Power & Solutions',
      content: 'based on a brand model',
    },
    {
      type: 'BUSINESS',
      title: 'Business Challenges you can solve with Power & Solutions',
      content: 'based on a brand model',
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
        <div className="flex items-center justify-center">
          <Heading
            type="dark"
            smallTitle={'Open Positions'}
            title={'Explore Current Opportunity at Bizmetric'}
            classes={'items-center'}
          />
        </div>
      </div>

      <div className="relative mx-auto container h-[450px]">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={20}
          slidesPerView={5}
          navigation
          freeMode={true}
          className="!overflow-hidden"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className={` ${index % 2 !== 0 ? 'mt-20' : ''}`}
            >
              <Link
                to={'/'}
                role="group"
                aria-roledescription="slide"
                className="max-w-md shrink-0 grow-0 pl-0"
              >
                <div className="text-left max-w-xs rounded-2xl border border-[#f2682a30] p-6 shadow-md bg-white relative hover:shadow-lg transition">
                  <div className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded mb-4">
                    Data Science
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                    Power BI
                    <br />
                    Architect
                  </h2>

                  <div className="mt-4 text-gray-600 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        />
                      </svg>
                      <span>All Locations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v6l4 2M12 4a8 8 0 100 16 8 8 0 000-16z"
                        />
                      </svg>
                      <span>Work Mode: Hybrid</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    Posted by:{' '}
                    <span className="font-semibold text-gray-700">
                      09-24-10
                    </span>
                  </p>

                  <div className="flex justify-center mt-10">
                    <PrimaryButton title={'Apply Now'} link={'/'} />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative mx-auto container mt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 leading-tight">
              We're many brilliant minds, <br />
              collaborating on the same platform
            </h1>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Bizmetric, we foster a culture of adaptability and youthful
              innovation, leveraging our state-of-the-art technology to rapidly
              adjust to market research, conditions, and customer needs.
            </p>
            <SecondaryButton title={'About Us'} link={'/about-us'} />
          </div>
        </div>

        <MasonryLayout />
      </div>
    </section>
  );
}
