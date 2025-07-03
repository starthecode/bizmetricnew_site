import React from 'react';
import { motion } from 'framer-motion';

export default function SvgLine4() {
  return (
    <div className="absolute w-full top-[520px] -right-[120px] hidden xl:block">
      <svg
        fill="none"
        viewBox="0 0 1784 897"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="paint0_linear_1_741"
            gradientUnits="userSpaceOnUse"
            x1="73.3236"
            x2="73.3236"
            y1="3"
            y2="998.46"
          >
            <stop stopColor="#04c89e" />
            <stop offset="0.019868" stopColor="#04c89e" />
            <stop offset="0.983867" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <motion.path
          d="M58 917.252H51.2013C24.5804 917.252 3 895.672 3 869.051V629.555V373.416C3 346.795 24.5804 325.215 51.2013 325.215L730.21 325.215L1443.8 325.215C1470.42 325.215 1492 303.635 1492 277.014V51.2013C1492 24.5805 1470.42 3 1443.8 3H1440.27"
          stroke="url(#paint0_linear_1_741)"
          strokeWidth="5.23927"
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
