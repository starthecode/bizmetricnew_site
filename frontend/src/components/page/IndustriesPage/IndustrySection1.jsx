// AboutusComp.jsx
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { motion, useAnimation } from 'framer-motion';
import { Heading } from '../../Heading/Heading';
import GlowLight from '../../extras/GlowLight';
import YoutubeEmbedVideo from '../../extras/embed/YoutubeEmbedVideo';
import { Line5 } from '../../lines';

const IndustrySection1 = ({ aboutIndustryData1, aboutIndustryData2 }) => {
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
    <section className="h-full px-10 md:px-24 xl:px-24 pt-10 xl:pt-0 py-10 mt-10">
      <GlowLight classes={'top-[25%] left-0 bg-flamingo-600/40'} />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 gap-12 items-start pt-10">
          <div className="col-span-2">
            <Heading
              type="dark"
              smallTitle={'Energy Industry Solutions'}
              title={'Turn Data Chaos into Competitive Advantage'}
            />
          </div>
          <div className="col-span-2">
            <p>{aboutIndustryData1?.textInput1}</p>
          </div>
        </div>
        <div className="relative overflow-hidden h-full pb-32">
          <div className="absolute inset-0">
            <Line5 />
          </div>
          <div className="flex justify-center items-center w-full mt-10">
            {/* Video */}
            <div className="iframe__div relative w-[300]" ref={ref}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative border border-junglegreen-400 rounded-xl p-2 w-fit h-fit"
              >
                <YoutubeEmbedVideo videoId={aboutIndustryData1?.textInput2} />
              </motion.div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center mt-20">
            <Heading
              classes={'items-center'}
              type="dark"
              smallTitle={
                'The Crisis: Data Overload, Rising Costs, & Missed Opportunities'
              }
              title={'The Hidden Costs of Outdated Systems'}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center -mt-32 mb-10 relative z-10">
        <div className="flex gap-10 mt-5 w-full max-w-[70em]">
          {aboutIndustryData2 &&
            aboutIndustryData2?.map((item, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-xl shadow-lg p-6 text-center mx-auto"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item?.textInput2}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {item?.textInput3}
                </p>
              </div>
            ))}
        </div>
      </div>
      <p className="w-full text-center mb-20">
        Without action, these challenges escalate. Bizmetric rewrites the
        narrative
      </p>
      <GlowLight classes={'right-0 bg-flamingo-600/40'} />
    </section>
  );
};

export default IndustrySection1;
