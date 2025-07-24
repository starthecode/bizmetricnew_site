import React from 'react';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function PageHeading({
  type,
  smallTitle,
  title,
  subText,
  classes,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        fontWeight: 500,
        transition: { duration: 0.8, ease: 'easeOut' },
      });
    }
  }, [inView, controls]);

  return (
    <div
      className={`relative z-10 flex mt-10 flex-col ${classes} w-full sm:text-center md:text-center xl:text-left`}
    >
      {smallTitle && (
        <div
          ref={ref}
          initial={{ y: -50, opacity: 0 }}
          animate={controls}
          className={`w-fit mb-4 px-3 py-3 border border-junglegreen-400/30 bg-gradient-to-b ${
            type == 'dark'
              ? 'from-white to-transparent'
              : 'from-junglegreen-100/10 to-transparent'
          } transition-shadow relative inline-flex items-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl`}
        >
          <h5
            className={`text-sm font-semibold text-foreground sm:leading-none uppercase block text-[#F4FFFA00] bg-clip-text bg-gradient-to-b ${
              type == 'dark'
                ? 'from-flamingo-600 to-ebony-950'
                : 'from-junglegreen-500 to-white'
            }`}
          >
            <span>{smallTitle}</span>
          </h5>
        </div>
      )}

      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={controls}
        className={`block leading-tight ${classes} text-[2.50rem] text-[#F4FFFA00] bg-clip-text bg-gradient-to-b ${
          type === 'dark'
            ? 'from-black to-junglegreen-500'
            : 'from-junglegreen-500 to-white'
        } leading-[40px]`}
      >
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </motion.h2>
      <p
        className="text-md text-white mt-5"
        dangerouslySetInnerHTML={{ __html: subText }}
      />
    </div>
  );
}
