import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '../Heading/Heading';

export function GalleryWithTab({ data }) {
  const [activeTab, setActiveTab] = useState('csractivity');
  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const currentRef = tabRefs.current[activeTab];
    if (currentRef) {
      const { offsetLeft, offsetWidth } = currentRef;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  if (!data?.items) return null;

  const activeTabData = data?.items.find(
    (tab) => tab.galleryboxesinput2 === activeTab
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-20">
      <div>
        <Heading
          type="dark"
          classes="items-center"
          smallTitle={data?.title}
          title={data?.subtitle}
          subText={data?.extratext}
        />
      </div>

      {/* Tab Headers */}
      <div className="relative flex gap-5 bg-flamingo-500/20 rounded-xl py-1 px-2 mb-6 overflow-hidden w-fit mt-10">
        {data &&
          data?.items.map(({ galleryboxesinput1, galleryboxesinput2 }) => (
            <button
              key={galleryboxesinput2}
              ref={(el) => (tabRefs.current[galleryboxesinput2] = el)}
              onClick={() => setActiveTab(galleryboxesinput2)}
              className={`${
                activeTab === galleryboxesinput2
                  ? 'bg-flamingo-500 text-white'
                  : 'bg-white text-woodsmoke-700'
              } relative z-10 px-6 py-2 text-sm font-medium  rounded-lg transition-all`}
            >
              {galleryboxesinput1}
            </button>
          ))}
        {/* Animated Active Tab Indicator */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute top-1 bottom-1 z-0 rounded-lg bg-flamingo-500 shadow"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>

      {/* Tab Content with Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {activeTabData?.galleryboxesfile.map(({ imageLink }, index) => (
            <div key={index}>
              <img
                src={imageLink}
                alt={`tab-${index}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
