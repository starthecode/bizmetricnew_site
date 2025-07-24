import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import { SecondaryButton } from './Buttons/SecondaryButton';

export const ServiceCards = ({ item, index }) => {
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
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
          ease: 'easeOut',
        },
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.95,
        y: 50,
        transition: {
          duration: 0.4,
          ease: 'easeIn',
        },
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      animate={controls}
      className="group overflow-hidden w-[300px] md:w-full lg:w-full xl:w-full relative z-20 ring-junglegreen-200 ring-1 p-1 rounded-xl bg-gradient-to-t from-onyx-900"
    >
      <div className="relative rounded-xl border-1 border-woodsmoke-300/70 z-10">
        <div
          className="group bg-cover bg-center bg-no-repeat h-[320px] relative overflow-hidden rounded-xl py-7"
          style={{
            backgroundImage: `url('${item?.servicesImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-transparent z-10"></div>
          <div className="relative z-20 flex flex-col gap-5 h-full items-start text-left mt-8">
            <div className="w-fit px-5 shadow-xl shadow-white/10 border border-junglegreen-200 border-l-0 relative font-medium text-sm inline-flex items-center gap-2 py-2 rounded-tr-xl rounded-br-xl">
              <span className="font-semibold text-md text-[#F4FFFA00] bg-clip-text bg-gradient-to-b from-white to-white/80">
                {item?.threeboxesinput1}
              </span>
            </div>
            <p
              className="text-sm font-thin text-white px-2 w-[250px]"
              dangerouslySetInnerHTML={{ __html: item?.threeboxesinput2 }}
            />

            {item?.servicesLink && (
              <div className="px-2">
                <SecondaryButton classes={'text-white'} title={'View More'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
