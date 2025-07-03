import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = [
  'Artificial Intelligence',
  'Data Analytics',
  'Enterprise Applications',
  'Operational Technology',
];
const colors = ['text-junglegreen-500', 'text-flamingo-500'];

const FrontLoader = () => {
  const [index, setIndex] = React.useState(0);
  const [colorIndex, setColorIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    }, 1500); // Change text every 1.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full h-screen items-center justify-center bg-white/80 dark:bg-woodsmoke-950 relative z-20">
      <div className="relative h-full w-full flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={texts[index]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute text-xl font-semibold ${colors[colorIndex]}`}
          >
            {texts[index]}
          </motion.div>
        </AnimatePresence>
        <span className="spinny-orb block mt-[110px]"></span>
      </div>
    </div>
  );
};

export default FrontLoader;
