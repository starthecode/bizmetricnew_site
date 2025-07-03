import React from 'react';
import { Heading } from './Heading/Heading';

import { FiGlobe, FiAperture, FiCrop, FiBox } from 'react-icons/fi';
import { SecondaryButton } from './Buttons/SecondaryButton';
import GlowLight from './extras/GlowLight';
import SvgLine3 from './lines/SvgLine3';

const iconMap = {
  FiGlobe,
  FiAperture,
  FiCrop,
  FiBox,
};

export default function Choose({ data }) {
  return (
    <section className="max-w-full px-10 sm:px-0 md:px-10 lg:px-20 xl:px-40 mt-20 pb-20 bg-white">
      <SvgLine3 />

      <GlowLight classes={'top-1/1 right-0 bg-flamingo-600/40'} />
      <div className="text-left mb-10">
        <Heading
          type={'dark'}
          title={data?.title}
          smallTitle={'Why Choose Our Services'}
        />
      </div>
      <div className="mt-20">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 relative">
            {data?.items &&
              data?.items?.map((card, index) => {
                const IconComponent = iconMap[card.whychooseIcon];
                return (
                  <div
                    key={index}
                    className={`mb-10 ${card.bg} ${card.textColor} ${
                      index === 1 || index === 2
                        ? 'w-full sm:w-full md:w-full lg:w-full xl:w-[400px]'
                        : 'w-full sm:w-full md:w-full lg:w-full xl:w-[530px]'
                    } ${
                      index === 0
                        ? 'relative left-5 bg-gradient-to-br from-blue-800 to-blue-500'
                        : ''
                    }
              ${
                index === 1
                  ? 'relative left-0 sm:left-0 md:left-0 lg:left-0 xl:left-16 bg-gradient-to-br from-onyx-900 to-onyx-600'
                  : ''
              }
              ${
                index === 2
                  ? 'relative right-0 sm:right-0 md:right-0 lg:right-0 xl:right-10 bg-gradient-to-br from-black to-onyx-600'
                  : ''
              }
              ${
                index === 3
                  ? 'relative right-0 sm:right-0 md:right-0 lg:right-0 xl:right-32 bg-gradient-to-br from-[#7C4DFF] to-[#7C4DFF]'
                  : ''
              } rounded-xl flex justify-between items-center shadow-lg transition-transform duration-300 overflow-hidden`}
                  >
                    <div className="group w-full md:w-full lg:w-full xl:w-[350px] relative overflow-hidden px-5 py-5">
                      <div className="text-3xl mb-2 bg-white/30 w-fit p-2 rounded-full">
                        {IconComponent && (
                          <IconComponent color={'white'} size={24} />
                        )}
                      </div>
                      <h3 className="text-[1.3em] font-normal mb-2 text-white">
                        {card.whychooseName}
                      </h3>
                      <p className="text-sm mb-2 leading-relaxed text-slate-200">
                        {card.whychooseSubName}
                      </p>
                      <SecondaryButton
                        title={card.whychooseBtnName}
                        link={card.whychooseBtnUrl}
                      />
                    </div>
                    <div className="w-1/1 md:max-w-md xl:w-1/1 h-full flex justify-end items-end relative overflow-hidden">
                      <img
                        src={`${card?.whychooseImage}`}
                        alt={card.title}
                        className={`relative rounded-2xl rounded-tr-none w-full h-[230px] object-cover ${
                          index === 0
                            ? 'bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500'
                            : ''
                        } ${
                          index === 1
                            ? 'bg-gradient-to-r from-onyx-500 via-onyx-300 to-onyx-500'
                            : ''
                        } ${
                          !index === 2 ? 'border-l border-t border-l-white' : ''
                        }  ${
                          index === 3
                            ? 'bg-gradient-to-r from-violet-800 to-violet-500'
                            : ''
                        } p-3 top-3 left-3 `}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
