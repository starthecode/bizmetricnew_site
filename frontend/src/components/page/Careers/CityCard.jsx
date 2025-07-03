import { useState, useEffect } from 'react';
import { SecondaryButton } from '../../Buttons/SecondaryButton';

const CityCard = ({ name, jobs, image, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`flex flex-col items-center text-center group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative mb-6">
        <div className="w-32 h-32 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
          <img
            src={`https://bizsiteuploads.blob.core.windows.net/uploads/${image}`}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>

      <h3 className="text-xl md:text-2xl font-light text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-300">
        {name}
      </h3>

      <p className="text-slate-500 text-sm md:text-base mb-4 group-hover:text-slate-600 transition-colors duration-300">
        {jobs} Jobs available
      </p>

      <SecondaryButton title={'  Explore Jobs'} link={'/'} />
    </div>
  );
};

export default CityCard;
