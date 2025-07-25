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
      onClick={() => setActiveTab(tab.threeboxesinput2)}
      className={`group  px-5 py-8 capitalize w-[200px] border-junglegreen-500 sm:w-[100px] md:w-[100px] lg:w-[200px] hover:bg-junglegreen-500 rounded-lg shadow-sm text-center border ${
        activeTab === tab.threeboxesinput2
          ? 'bg-junglegreen-600 border-junglegreen-200'
          : 'bg-white'
      } transition-all`}
    >
      <div className="flex flex-col items-center gap-1">
        <span
          className={`text-md font-medium group-hover:text-white ${
            activeTab === tab.threeboxesinput2
              ? 'text-white'
              : 'text-junglegreen-500'
          } transition-all`}
        >
          {IconComponent && <IconComponent size={24} />}
        </span>
        <span
          className={`text-xs sm:text-xs md:text-sm lg:text-md xl:text-md 2xl:text-md font-semibold group-hover:text-white ${
            activeTab === tab.threeboxesinput2
              ? 'text-white'
              : 'text-junglegreen-900'
          } transition-all`}
        >
          {tab.threeboxesinput2}
        </span>
      </div>
    </motion.button>
  );
};

export default IndustryTabButton;
