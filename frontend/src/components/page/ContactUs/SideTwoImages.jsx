import React from 'react';

export default function SideTwoImages({ customMetaExtra, customMetaExtra2 }) {
  return (
    <div className="relative w-full flex justify-end items-end py-10 pb-20">
      {/* Main Image Stack */}
      <div className="relative flex justify-center items-center">
        {/* Dot pattern - Top Left */}
        <div className="absolute -top-10 -left-32 grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 bg-flamingo-500 rounded-full opacity-70"
            />
          ))}
        </div>
        <img
          src={customMetaExtra}
          alt="Server Room"
          className="w-[300px] rounded-xl shadow-xl z-10 border-4 border-flamingo-200/80"
        />
        <img
          src={customMetaExtra2}
          alt="Digital Interface"
          className="absolute bottom-[-50px] right-[150px] w-[300px] rounded-xl shadow-xl z-20 border-4 border-junglegreen-200/80"
        />
        {/* Dot pattern - Bottom Right */}
        <div className="absolute -bottom-20 right-10 grid grid-cols-5 gap-1">
          {Array.from({ length: 25 }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 bg-junglegreen-600 rounded-full opacity-70"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
