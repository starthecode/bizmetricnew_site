import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import GlowLight from '../extras/GlowLight';
import { LuShare2 } from 'react-icons/lu';
import { Heading } from '../Heading/Heading';

const blogItems = [
  {
    category: 'Fabric Integration',
    title:
      'Seamlessly Integrate D365 with Microsoft Fabric: Bizmetric’s Cost-Effective Accelerator',
    date: 'DEC 28, 2024',
    time: '2 MINS TO READ',
    image:
      'https://bizsiteuploads.blob.core.windows.net/uploads/1745393586343-blogcardimg01.webp',
  },
  {
    category: 'Oracle Fusion Integration',
    title:
      'Overcoming ERP Data Challenges with Microsoft Fabric and Oracle Fusion Integration',
    date: 'DEC 28, 2024',
    time: '',
    image:
      'https://bizsiteuploads.blob.core.windows.net/uploads/1745393596619-blogcardimg02.webp',
  },
  {
    category: 'Data Transformation',
    title:
      'How to Integrate Oracle Fusion with Microsoft Fabric for Data Transformation?',
    date: 'DEC 28, 2024',
    time: '2 MINS TO READ',
    image:
      'https://bizsiteuploads.blob.core.windows.net/uploads/1745393610946-blogcardimg03.webp',
  },
];

function AnimatedBlogCards({ blog, index }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
          ease: 'easeOut',
        },
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.95,
        y: 50,
        transition: {
          duration: 0.4,
          ease: 'easeIn',
        },
      });
    }
  }, [inView, controls, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      animate={controls}
      className="group relative rounded-xl overflow-hidden"
    >
      <div className="max-w-xs rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-t-3xl"
          />
          {/* Share Icon (top-right) */}
          <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
            <LuShare2 size={18} />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-flamingo-200 text-white p-4 rounded-b-3xl space-y-3">
          <p className="text-sm uppercase tracking-wide text-woodsmoke-800 relative z-10">
            {' '}
            {blog.date} {blog.time && <span className="mx-2">|</span>}
            {blog.time}
          </p>
          <h3 className="text-md font-semibold leading-tight text-black relative z-10">
            {blog.title.substring(0, 40)} {blog.title.length >= 20 && '...'}
          </h3>

          {/* Tags */}
          <div className="flex gap-2 mt-2 relative z-10">
            <span className="bg-flamingo-500 text-white text-xs px-3 py-1 rounded-xl font-medium">
              Healthcare
            </span>
            <span className="bg-white text-[#D45A2E] text-xs px-3 py-1 rounded-xl font-medium">
              {blog.category}
            </span>
          </div>

          {/* Read time */}
          <div className="w-full flex items-end justify-end relative z-10">
            <SecondaryButton
              classes={'text-flamingo-500 text-sm'}
              title={'Read More'}
              link={'/'}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NewsCards() {
  return (
    <>
      <GlowLight classes={'top-1/1 right-0 bg-junglegreen-500/40'} />
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row text-center items-center justify-center mb-10">
        <Heading
          type=""
          smallTitle={'Our Blogs'}
          title={'Tech Talks & News'}
          classes={'items-center md:items-start lg:items-start xl:items-start'}
        />
        <div className="flex justify-center sm:justify-center md:justify-center lg:justify-end xl:justify-end mb-6">
          <PrimaryButton title={'View All'} link={'/'} />
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:flex gap-20 items-center justify-center justify-items-center">
          {blogItems.map((blog, index) => (
            <AnimatedBlogCards key={index} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
