import React from 'react';
import { Heading } from '../../Heading/Heading';

import { MdOutlineDownloading } from 'react-icons/md';
import { MdSettingsSystemDaydream } from 'react-icons/md';
import { IoMdTrophy } from 'react-icons/io';

const iconMap = {
  MdOutlineDownloading,
  MdSettingsSystemDaydream,
  IoMdTrophy,
};

export default function IndustrySection2({ aboutIndustryData3 }) {
  return (
    <section
      className="relative py-24 sm:py-24 md:py-24 lg:py-24 z-10 h-fit"
      style={{
        backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="h-full max-w-full px-0 sm:px-0 md:px-40 lg:px-40 xl:px-40">
        <div className="flex text-center justify-center">
          <Heading
            type=""
            smallTitle={''}
            title={'Bizmetric: Your Partner in Energy Innovation'}
            subText={'Where Data Meets Actionable Intelligence'}
          />
        </div>{' '}
        <div className="w-full flex flex-col justify-center items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid xl:grid-cols-3 gap-10 mt-10 ">
          {aboutIndustryData3 &&
            aboutIndustryData3?.map((item, index) => {
              const IconComponent = iconMap[item.textInput1];
              return (
                <div
                  key={index}
                  className="text-center flex flex-col items-center w-fit py-8 px-0 md:w-full lg:w-full xl:w-full relative z-20 ring-junglegreen-200 ring-1 p-1 rounded-xl bg-gradient-to-t from-onyx-900"
                >
                  {IconComponent && (
                    <IconComponent size={40} className="fill-flamingo-500" />
                  )}
                  <h2 className="text-md font-medium text-junglegreen-500 py-5">
                    {item?.textInput2}
                  </h2>
                  <p className="text-sm text-white">{item?.textInput3}</p>
                </div>
              );
            })}
        </div>
      </div>
      {/* <div className="relative w-full -z-40 -top-[100px] left-20 px-10 hidden xl:block">
        <SvgLine2 />
      </div> */}
      {/* Tabs */}
      {/* <IndustryAccordions /> */}
    </section>
  );
}
