import React from 'react';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LiteYouTubeEmbed from '../../extras/LiteYouTubeEmbed';
import { PrimaryButton } from '../../Buttons/PrimaryButton';
import { Heading } from '../../Heading/Heading';

export default function IndustrySection5({ aboutIndustryData6 }) {
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
    <section className="relative py-24 sm:py-24 md:py-24 lg:py-24 z-10 h-fit">
      <div className="h-full max-w-full px-0 sm:px-0 md:px-40 lg:px-40 xl:px-40">
        <div className="flex justify-center items-start w-full">
          <Heading
            type={'dark'}
            smallTitle={'Why Bizmetric'}
            title={'Ready to Future-Proof Your Energy Operations?'}
            subText={'Stop losing millions to downtime and inefficiency!'}
          />
        </div>
        <div className="py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {aboutIndustryData6 &&
              aboutIndustryData6?.map((item, index) => (
                <div key={index}>
                  <h3 className="text-3xl font-medium text-flamingo-500 whitespace-pre-line">
                    {item?.textInput2}
                  </h3>
                  <p className="mt-4 text-gray-600 text-lg">
                    {item?.textInput3}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
