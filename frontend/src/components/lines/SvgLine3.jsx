import React from 'react';
import { motion } from 'framer-motion';

export default function SvgLine3() {
  return (
    <div className="absolute w-full left-[10rem] mt-[7rem] hidden xl:block">
      <svg
        width={1150}
        fill="none"
        viewBox="0 0 1539 655"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="paint0_linear_2864_6948"
            x1="1463.6"
            y1="-17.8589"
            x2="1463.6"
            y2="649.974"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#04c89e" />
            <stop offset="0.019868" stopColor="#04c89e" />
            <stop offset="0.983867" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <motion.path
          d="M1287 652H1490C1515.41 652 1536 631.405 1536 606V402.484V300.676C1536 275.271 1515.41 254.676 1490 254.676H929M769.5 3H49C23.5949 3 3 23.5949 3 49V208.676C3 234.081 23.5949 254.676 49 254.676H386.25"
          stroke="url(#paint0_linear_2864_6948)"
          strokeWidth="5"
          opacity="0.8"
          fill="none"
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{ pathLength: 1, pathOffset: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
