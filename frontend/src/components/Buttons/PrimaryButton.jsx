import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PrimaryButton = ({ type, disabled, title, link }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 5,
      }}
      className="p-1 rounded-3xl bg-gray-950/5 border w-max flex"
    >
      {type === 'link' ? (
        <a
          href={link}
          className="items-center shadow-flamingo-500/10 group relative z-[1] flex w-full gap-1.5 rounded-3xl border border-junglegreen-500  bg-junglegreen-500 hover:border-flamingo-600  hover:bg-flamingo-500  px-4 py-2 shadow-md before:absolute before:inset-0 before:rounded-3xl before:border before:border-junglegreen-500 before:bg-gradient-to-b before:from-junglegreen-500 dark:before:border-junglegreen-700 dark:before:bg-gradient-to-b dark:before:from-junglegreen-500"
        >
          <span className="relative z-[2] flex items-center font-bold text-white text-xs lg:text-md xl:text-md">
            {title}
          </span>
        </a>
      ) : (
        <button
          disabled={disabled}
          type={type}
          className="items-center shadow-flamingo-500/10 group relative z-[1] flex w-full gap-1.5 rounded-3xl border border-junglegreen-500  bg-junglegreen-500 hover:border-flamingo-600  hover:bg-flamingo-500  px-4 py-2 shadow-md before:absolute before:inset-0 before:rounded-3xl before:border before:border-junglegreen-500 before:bg-gradient-to-b before:from-junglegreen-500 dark:before:border-junglegreen-700 dark:before:bg-gradient-to-b dark:before:from-junglegreen-500"
        >
          <span className="relative z-[2] flex items-center font-bold text-white text-xs lg:text-md xl:text-md">
            {title}
          </span>
        </button>
      )}
    </motion.div>
  );
};
