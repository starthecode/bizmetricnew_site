import { TbStarFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { Heading } from './Heading/Heading';
import { motion } from 'framer-motion';

const MarqueeBanner = ({ data, type, mrqData }) => {
  return type === 'about-us' ? (
    <div className="container py-20">
      <div className="w-full flex flex-col justify-center items-center">
        <Heading
          classes={'items-center justify-center'}
          type={'dark'}
          smallTitle={data?.title}
          title={data?.subtitle}
        />
      </div>

      {/* Marquee content container */}
      <div className="relative w-full overflow-hidden py-10">
        <div className="flex">
          <motion.div
            initial={{ x: `${0}` }}
            animate={{ x: `${'-100%'}` }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="flex flex-shrink-0 gap-10 items-center justify-center"
          >
            {data &&
              data?.items?.map((image, index) => {
                return (
                  <div className="py-3 px-4 rounded-xl flex text-center justify-center items-center">
                    <img
                      width={200}
                      height={200}
                      alt={`marqueImg${index}`}
                      className="object-contain"
                      src={image?.logoUrl}
                      key={index}
                    />
                  </div>
                );
              })}
          </motion.div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative w-full overflow-hidden border-y border-junglegreen-500/60 bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-3 mt-8 mb-8 text-center sm:text-center md:text-center lg:text-left xl:text-left grid sm:block md:flex xl:flex sm:justify-center md:justify-start xl:justify-start items-center">
      {/* Fixed "What’s New" */}
      <div className="sm:w-full md:w-[160px] lg:w-[160px] xl:w-[160px] pl-4">
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-junglegreen-500 to-blue-500">
          {mrqData?.title}
        </span>
      </div>

      {/* Marquee content container */}
      <div className="relative w-full overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex items-center">
          {mrqData?.items &&
            mrqData?.items?.map((text, index) => (
              <Link
                to={text?.threeboxesinput2}
                key={index}
                className="flex items-center group"
              >
                <span className="text-white text-lg font-medium group-hover:text-flamingo-500">
                  {text?.threeboxesinput1}
                </span>
                {/* Add icon only if not the last item */}
                {index !== mrqData.length - 1 && (
                  <TbStarFilled size={20} className="fill-flamingo-500 mx-3" />
                )}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
