import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import PageHeading from '../Heading/PageHeading';

export default function HeroSection2({ metaFields }) {
  return (
    <div
      className="relative h-[550px] py-0 sm:py-0 md:pt-24 lg:pt-24 xl:pt-24 overflow-hidden z-10"
      style={{
        backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/succcess-stories-banner18434.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'initial',
      }}
    >
      <div className="absolute inset-0 bg-black/80 z-0" />

      <div className="container">
        <div className="w-full flex flex-col justify-center items-center mb-20">
          <div className="grid mx-auto w-full justify-start items-start mb-5 mt-14">
            <Breadcrumbs capitalizeLinks />
            <PageHeading
              type={''}
              smallTitle={'Success Stories'}
              title={'Explore Our Case Studies'}
              subText={
                'Helping customers achieve success with dynamic digital solutions and enterprise-driven best practices'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
