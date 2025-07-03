import React from 'react';
import { Heading } from './Heading/Heading';
import { PrimaryButton } from './Buttons/PrimaryButton';
import GlowLight from './extras/GlowLight';
import SvgLine4 from './lines/SvgLine4';

import NewsCards from './Cards/NewsCards';
import QuoteCards from './Cards/QuoteCards';

export default function ThreeBlogs({ testimonialsData }) {
  return (
    <section
      className="relative px-0 sm:px-0 md:px-10 lg:px-40 xl:px-40 pt-28 xl:pb-40 z-10 bg-black mb-40"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <NewsCards />
      <SvgLine4 />
      <div className="relative overflow-hidden z-10 mt-28 pb-20 xl:pb-0 xl:mt-48">
        <div>
          <Heading
            type={''}
            smallTitle={'CLIENT TESTIMONIALS'}
            title={testimonialsData?.title}
          />
        </div>
        <div className="flex flex-col justify-between items-center lg:grid lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-10 relative z-10">
          {testimonialsData?.items &&
            testimonialsData.items.map((item, index) => (
              <div key={index}>
                <QuoteCards data={item} index={index} />
              </div>
            ))}
        </div>
      </div>
      <GlowLight classes={'-left-10 bottom-10 bg-junglegreen-500/40'} />
      <div className="absolute bottom-10 -right-48 opacity-10">
        <img
          className="w-full"
          src="https://bizsiteuploads.blob.core.windows.net/uploads/quotes.png"
        />
      </div>
    </section>
  );
}
