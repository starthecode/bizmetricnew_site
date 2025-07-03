// components/BackgroundSection.jsx

import React from 'react';

export default function BackgroundSection({
  children,
  className = '',
  style = {},
}) {
  return (
    <section
      className={`relative py-20 sm:py-24 md:py-24 lg:py-20 z-10 mt-40 ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://bizsiteuploads.blob.core.windows.net/uploads/Background-Colour-Gradient-667564.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
    >
      {children}
    </section>
  );
}
