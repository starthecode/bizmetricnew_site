import React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import PageHeading from '../Heading/PageHeading';

export default function HeroSection({ metaFields }) {
  return (
    <div
      className="relative h-[550px] py-0 sm:py-0 md:pt-24 lg:pt-24 xl:pt-24 overflow-hidden z-10"
      style={{
        backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/solution-hero-section-img-67676.jpg')`,
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
              smallTitle={''}
              title={'Gen AI Customer Insight with<br/> Azure Cosmos Database'}
              subText={
                'Enhance call center operations with our Gen AI app using Azure Cosmos DB<br/> — gain insights, boost agent performance, and elevate customer experience.'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
