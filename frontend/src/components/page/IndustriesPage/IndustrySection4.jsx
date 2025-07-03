import React from 'react';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PrimaryButton } from '../../Buttons/PrimaryButton';
import YoutubeEmbedVideo from '../../extras/embed/YoutubeEmbedVideo';

export default function IndustrySection4({ aboutIndustryData5 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1 });
    } else {
      controls.start({ x: -100, opacity: 0 });
    }
  }, [inView, controls]);

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
        <div className="grid grid-cols-2 gap-10">
          <div className="flex justify-center items-center w-full">
            {/* Video */}
            <div className="iframe__div relative w-[300]" ref={ref}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative border border-junglegreen-400 rounded-xl p-2 w-fit h-fit"
              >
                <YoutubeEmbedVideo videoId={aboutIndustryData5?.textInput1} />
              </motion.div>
            </div>
          </div>
          <div>
            <div
              className="industry__box2 text-white mb-10"
              dangerouslySetInnerHTML={{
                __html: aboutIndustryData5?.textInput2,
              }}
            />
            <PrimaryButton
              title={'View Case Study'}
              link={aboutIndustryData5?.textInput3}
            />
          </div>
        </div>
        {/* <div className="w-full flex flex-col justify-center items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid xl:grid-cols-3 gap-10 mt-10 ">
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
                  <h2 className="text-md text-junglegreen-500 py-5">
                    {item?.textInput2}
                  </h2>
                  <p className="text-sm text-white">{item?.textInput3}</p>
                </div>
              );
            })}
        </div> */}
      </div>
    </section>
  );
}
