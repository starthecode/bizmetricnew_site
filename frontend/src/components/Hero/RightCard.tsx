'use client';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PopupContext from '../Extras/Popups/PopupContext';

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;
export const RightCard = ({ item }: { item: any }) => {
  const { openPopup } = useContext(PopupContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <>
      <div className="relative flex 2xl:justify-end justify-center text-center lg:pl-32 lg:text-right">
        {!!item?.addVideo && (
          <div className="relative z-[9999] left-[40px] top-0 bottom-0 translate-y-2/4 end-0 text-center">
            <div
              onClick={() =>
                openPopup(
                  <div>
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/3sM5z8J7ZgE"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                )
              }
              className="cursor-pointer h-20 w-20 rounded-full shadow-lg inline-flex items-center justify-center bg-gradient-to-r from-formalGreenLight to-formalGreen"
            >
              <FaPlay size={20} />
            </div>
          </div>
        )}

        <div className="relative overflow-hidden">
          <motion.div
            className="image__container"
            initial={false}
            animate={
              isLoaded && isInView
                ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
            }
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsInView(true)}
          >
            <Image
              loading="lazy"
              width={300}
              height={300}
              quality={100}
              priority={false}
              onLoad={() => setIsLoaded(true)}
              src={item.homeSliderImage?.sourceUrl}
              className={`w-[200px] md:w-[200px] lg:w-[350px] xl:w-[350px] shadow dark:shadow-gray-800 object-contain rounded-tl-[50px] rounded-br-[50px]`}
              alt=""
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="glasss"></div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
