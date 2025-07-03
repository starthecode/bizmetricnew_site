import React from 'react';
import { Heading } from './Heading/Heading';
import SvgLine2 from './lines/SvgLine2';

import { ServiceCards } from './ServiceCards';
import IndustryAccordions from './DashComponents/IndustryAccordions';

export const OverviewVerticles = ({ overviewData }) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid xl:grid-cols-3 gap-10 mt-10 ">
        {overviewData?.map((item, index) => (
          <div key={index}>
            <ServiceCards item={item} index={index} />
          </div>
        ))}
      </div>
    </>
  );
};
