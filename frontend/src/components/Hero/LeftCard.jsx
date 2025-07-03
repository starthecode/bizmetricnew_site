import React from 'react';
import { motion } from 'framer-motion';

import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import { FaArrowRight } from 'react-icons/fa6';
import { SecondaryButton } from '../Buttons/SecondaryButton';

export const LeftCard = ({ item }) => {
  const services_items =
    'text-base md:text-md lg:text-lg xl:text-xl block text-white  font-normal';

  return (
    <>
      {item?.homeSliderMiniText && (
        <Link
          to="#"
          className="relative z-[1] shadow-xl overflow-hidden inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm bg-white rounded-full dark:bg-onyx-900 hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <p className="glow_animation relative text-xs bg-junglegreen-500 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </p>
          <p className="text-sm font-medium dark:text-white">
            {item?.homeSliderMiniText}
          </p>
          <BiChevronRight className="ml-2 w-4 h-4" />
        </Link>
      )}

      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="mb-0 text-center  lg:text-left text-foreground sm:text-xl md:text-3xl xl:text-5xl !leading-tight"
      >
        <span
          className="block font-medium text-[#F4FFFA00] bg-clip-text bg-gradient-to-b from-junglegreen-400 via-junglegreen-100 to-white"
          dangerouslySetInnerHTML={{ __html: item.titleText }}
        />

        <span className="pb-2 text-transparent bg-clip-text bg-gradient-to-br dark:from-junglegreen-400 dark:via-junglegreen-500 dark:to-junglegreen-500 from-junglegreen-500 via-junglegreen-500 to-junglegreen-800 block md:ml-0">
          {item.homeSliderTitle2}
        </span>
      </motion.h1>

      {item.homeSliderDesc && (
        <p className="mb-8 max-w-md text-center text-lg font-medium text-ebony-700 dark:text-[#9ca3af] lg:text-left">
          {item.homeSliderDesc}
        </p>
      )}

      {item.buttonText && (
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start xl:items-center mt-5">
          <PrimaryButton title={item.buttonText} link={item.buttonUrl} />
          <SecondaryButton
            title={item.buttonTextTwo}
            link={item.homeSliderBtn2Url}
          />
        </div>
      )}

      {item.subText && item.subTextTwo && item.subTextThree && (
        <div className="flex flex-col items-center justify-center md:items-start w-full mt-5 mb-5 md:mt-10 sm:mt-10 border border-white bg-[linear-gradient(182deg,_#000000e0,_transparent)] rounded-xl px-5 py-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center md:text-left">
            {[item.subText, item.subTextTwo, item.subTextThree].map(
              (text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className={services_items}
                >
                  <div className="block">
                    <span>
                      <img
                        className="w-[20px] h-auto object-contain mx-auto md:mx-0 mb-0"
                        src="https://bizsiteuploads.blob.core.windows.net/uploads/Insights.svg"
                        alt="Insight Icon"
                      />
                    </span>
                    <div
                      className="hover:text-flamingo-400 font-semibold"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                    <span className="text-xs leading-4 block text-slate-300">
                      {idx === 0
                        ? 'Transform your legacy technology with AI-enabled processes.'
                        : 'Adopt the best analytics and Data Analytics Services methodologies'}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};
