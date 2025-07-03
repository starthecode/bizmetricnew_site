// AboutusComp.jsx
import React from 'react';
import { PrimaryButton } from './Buttons/PrimaryButton';
import { Heading } from './Heading/Heading';
import GlowLight from './extras/GlowLight';
import { useInView } from 'react-intersection-observer';

import { motion, useAnimation } from 'framer-motion';
import LiteYouTubeEmbed from './extras/LiteYouTubeEmbed';
import YoutubeEmbedVideo from './extras/embed/YoutubeEmbedVideo';

const AboutUs = ({ data }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1 });
    } else {
      controls.start({ x: -100, opacity: 0 });
    }
  }, [inView, controls]);

  return (
    <section className="pt-10 xl:pt-24 py-10 px-24">
      {/* <GlowLight classes={'top-[25%] left-0 bg-flamingo-600/40'} /> */}
      <div className="max-w-7xl mx-auto">
        <Heading
          type="dark"
          smallTitle={data?.smallTitle}
          title={data?.aboutTitle}
        />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-0 items-start pt-10">
          {/* Video */}
          <div className="iframe__div relative w-fit" ref={ref}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={controls}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative border border-junglegreen-400 rounded-xl p-2 w-fit"
            >
              {' '}
              <YoutubeEmbedVideo videoId="0DysrE4uCsk" />
            </motion.div>
          </div>

          {/* Text Content */}
          <div>
            <p
              className="text-gray-700 text-md mb-8"
              dangerouslySetInnerHTML={{ __html: data?.descField }}
            />

            <PrimaryButton title={data.buttonText} link={data.buttonUrl} />
            {/* Stats */}
            <div
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
              dangerouslySetInnerHTML={{ __html: data?.moreField }}
            />
          </div>
        </div>
      </div>
      {/* <GlowLight classes={'right-0 bg-flamingo-600/40'} /> */}
    </section>
  );
};

export default AboutUs;
