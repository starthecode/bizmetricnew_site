import React from 'react';
import { motion } from 'framer-motion';

export default function SvgLine1() {
  return (
    <div className="relative hidden xl:block">
      <svg
        width={1200}
        height={700}
        viewBox="0 0 1552 756"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="paint0_linear_3831_12188"
            x1="1515.82"
            y1="-106"
            x2="1515.82"
            y2="662"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#04c89e" />
            <stop offset="0.0314417" stopColor="#04c89e" />
            <stop offset="0.959393" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <motion.path
          d="M1484 752.5H1503C1528.41 752.5 1549 731.905 1549 706.5V353C1549 327.595 1528.41 307 1503 307H49C23.5949 307 3 286.405 3 261V100.5V49.5C3 24.0949 23.5949 3.5 49 3.5H701.5"
          stroke="url(#paint0_linear_3831_12188)"
          strokeWidth="5.24"
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
