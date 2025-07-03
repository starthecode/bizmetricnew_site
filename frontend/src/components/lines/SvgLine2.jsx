import React from 'react';
import { motion } from 'framer-motion';

export default function SvgLine2() {
  return (
    <div className="absolute w-full z-10 top-[460px] left-20 px-10 hidden xl:block">
      <svg
        width={1200}
        height={700}
        fill="none"
        viewBox="0 0 1784 897"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="paint0_linear_1_974"
            gradientUnits="userSpaceOnUse"
            x1="1728.26"
            x2="1728.26"
            y1="59.3881"
            y2="894.781"
          >
            <stop stopColor="#e5e7eb00" />
            <stop offset="0.104167" stopColor="#04c89e" />
            <stop offset="0.965816" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <motion.path
          d="M1708.83 894H1735C1760.41 894 1781 873.405 1781 848V608.185C1781 582.78 1760.41 562.185 1735 562.185H49C23.5949 562.185 3 541.59 3 516.185V222.499C3 197.094 23.5949 176.499 49 176.499H1556.72C1597.71 176.499 1618.23 126.934 1589.23 97.9605L1493.2 2"
          stroke="url(#paint0_linear_1_974)"
          strokeWidth="5"
          opacity="0.8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
