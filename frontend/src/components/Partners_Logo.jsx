// components/Partners_logo.jsx

import GlowLight from './extras/GlowLight';
import { Heading } from './Heading/Heading';
import SvgLine1 from './lines/SvgLine1';
import { motion } from 'framer-motion';

import { useInView } from 'react-intersection-observer';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function PartnersLogo({ data }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative pt-20 py-10 overflow-hidden">
      {/* <GlowLight classes={'top-1/1 right-0 bg-flamingo-600/40'} /> */}
      <div>
        <Heading type={'dark'} title={data?.title} />
      </div>

      <div
        ref={ref}
        className="grid grid-cols-3 place-items-center md:flex md:flex-wrap lg:flex lg:flex-wrap xl:flex xl:flex-wrap justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-start gap-5 mt-5"
      >
        {data?.items &&
          data?.items?.map((partner, i) => (
            <motion.div
              key={i}
              className="w-20 h-20 md:w-28 md:h-28 xl:w-28 xl:h-28 rounded-full border border-junglegreen-400 flex items-center justify-center bg-white shadow-sm"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <img
                src={`${partner.logoUrl}`}
                alt={'partner logo'}
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </motion.div>
          ))}
      </div>
    </section>
  );
}
