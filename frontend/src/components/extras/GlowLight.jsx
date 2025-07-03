import React from 'react';

export default function GlowLight({ classes }) {
  return (
    <>
      <span
        className={`absolute blur-[80px] w-[250px] h-[250px] rounded-full ${classes} -translate-y-1/3 end-1 ltr:-translate-x-1/2 rtl:translate-x-1/2`}
      ></span>
    </>
  );
}
