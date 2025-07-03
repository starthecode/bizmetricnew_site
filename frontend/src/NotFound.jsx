// NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <section
      className="relative pt-24 sm:pt-24 md:pt-24 lg:py-24 z-10"
      style={{
        backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="text-center py-40">
        <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
        <p className="mt-4 text-woodsmoke-300">
          Sorry, the page you're looking for doesn't exist.
        </p>
      </div>
    </section>
  );
};

export default NotFound;
