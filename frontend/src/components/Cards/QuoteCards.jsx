import React from 'react';

import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

export default function QuoteCards({ data, index }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
          ease: 'easeIn',
        },
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.95,
        x: 50,
        transition: {
          duration: 0.4,
          ease: 'easeOut',
        },
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, x: 50 }}
      animate={controls}
      key={index}
      className="w-[370px] relative border-l border-t border-junglegreen-500/60 pt-1 pb-10 max-w-6xl rounded-2xl shadow-lg text-white"
    >
      <div className="p-4 lg:p-6 rounded-xl relative group h-full pt-16 pb-20 bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div className="block items-center">
          <div className="flex-grow">
            <div className="text-sm text-gray-500">
              <span className="text-xs font-bold text-gray-400 mr-1">
                ★★★★★
              </span>
            </div>
          </div>
          <h3 className="mt-1 text-md font-bold text-white">
            {data?.testimonialsName}
          </h3>
          <span className="text-xs font-medium text-flamingo-500">
            Experienced Billing Manager
          </span>
          <p className="pt-2 text-sm text-woodsmoke-300">
            Bizmetric renders outstanding Oracle Services. Their expertise in
            delivering a high-performance Data Analytics Solu...
          </p>
        </div>
      </div>
    </motion.blockquote>
  );
}
