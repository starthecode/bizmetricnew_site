import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion, useAnimation } from 'framer-motion';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import GlowLight from '../components/extras/GlowLight';
import { Heading } from '../components/Heading/Heading';
import CaseStudiesGrid from '../components/page/CaseStudy/CaseStudiesGrid';
import { SearchBar } from '../components/extras/SearchBar';
import PagePostHero from '../components/HeroSection/PagePostHero';
import NumericLoader from '../components/Loader/NumericLoader';

export default function SuccessStories() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [notFound, setNotFound] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1 });
    } else {
      controls.start({ x: -100, opacity: 0 });
    }
  }, [inView, controls]);

  const startTime = Date.now();

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      setLoading(true);
      setData(null);
      setTitle('');
      setNotFound(false);

      try {
        const res = await fetch(`/api/casestudy/getpage/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (!res.ok || !json?.title) {
          setNotFound(true);
          return;
        }

        setData(json);
        setTitle(json.title);
      } catch (error) {
        console.error(error.message || 'Something went wrong');
        setNotFound(true);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = 3000 - elapsed;
        setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    };

    fetchPage();
  }, [slug]);

  // if (loading)
  //   return (
  //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
  //       <div className="absolute inset-0 bg-black animate-expand" />
  //       <div className="z-10 text-white text-5xl font-semibold animate-fadein">
  //         <NumericLoader />
  //       </div>
  //     </div>
  //   );

  if (notFound) return <NotFound />;

  return (
    <section className="mb-28">
      <PagePostHero
        bannerImg={
          'https://bizsiteuploads.blob.core.windows.net/uploads/1750739948852-success-stories-banner-635435.webp'
        }
        smallTitle="Case Studies"
        title={'Success Stories'}
        excerpts={
          'Helping customers achieve success with dynamic digital solutions and enterprise-driven best practices.'
        }
        customMetaLinkText={'Talk To Our Expert'}
        customMetaLink={'/'}
        customMetaLinkTwoText={'Contact Us'}
        customMetaLinkTwo={'/'}
      />
      <GlowLight classes={'top-[25%] left-0 bg-flamingo-600/40'} />
      <div className="flex flex-col justify-center items-center mb-10 mt-20">
        <Heading
          classes={'items-center'}
          type={'dark'}
          smallTitle={'Search'}
          title={'Search By Specific'}
        />
      </div>
      <SearchBar type={'light'} />
      <CaseStudiesGrid />
    </section>
  );
}
