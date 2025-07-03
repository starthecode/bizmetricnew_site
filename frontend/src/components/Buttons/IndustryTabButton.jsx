import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const IndustryTabButton = ({
  tab,
  index,
  activeTab,
  setActiveTab,
  IconComponent,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
          ease: 'easeOut',
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: -50,
        transition: {
          duration: 0.3,
          ease: 'easeIn',
        },
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: -50 }}
      animate={controls}
      key={index}
      onClick={() => setActiveTab(tab.industryName)}
      className={`px-5 py-8 w-[200px] sm:w-[100px] md:w-[100px] lg:w-[200px] rounded-lg shadow-sm text-center border ${
        activeTab === tab.industryName
          ? 'bg-junglegreen-500 border-junglegreen-200'
          : 'bg-white'
      } transition-all`}
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className={`text-md font-medium ${
            activeTab === tab.industryName
              ? 'text-white'
              : 'text-junglegreen-500'
          } transition-all`}
        >
          {IconComponent && <IconComponent size={24} />}
        </span>
        <span
          className={`text-xs sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md font-medium ${
            activeTab === tab.industryName ? 'text-white' : 'text-black'
          } transition-all`}
        >
          {tab.industryName}
        </span>
      </div>
    </motion.button>
  );
};

export default IndustryTabButton;
