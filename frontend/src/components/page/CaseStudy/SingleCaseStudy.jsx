import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion, useAnimation } from 'framer-motion';
import { useParams } from 'react-router-dom';
import NumericLoader from '../../Loader/NumericLoader';
import NotFound from '../../../NotFound';
import PagePostHero from '../../HeroSection/PagePostHero';

import '../CaseStudy/index.css';
import CaseStudyContent from './content/CaseStudyContent';
import CaseStudySection from '../../extras/CaseStudySection';

export default function SingleCaseStudy() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [pageHeaderData, setPageHeaderData] = useState({
    smalltitle: '',
    title: '',
    excerpts: '',
    bannerImg: '',
  });

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
      setNotFound(false);

      try {
        const res = await fetch(`/api/casestudies/singleCasestudies/${slug}`, {
          method: 'GET',
          // cache: 'force-cache',
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

        setPageHeaderData({
          smalltitle: 'Case Study',
          title: json.title || '',
          excerpts: json.excerpts || '',
          bannerImg: json.metaFields?.featuredImage || '',
        });
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

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-black animate-expand" />
        <div className="z-10 text-white text-5xl font-semibold animate-fadein">
          <NumericLoader />
        </div>
      </div>
    );

  if (notFound) return <NotFound />;

  return (
    <section>
      <PagePostHero {...pageHeaderData} />
      <CaseStudyContent data={data} />
      <CaseStudySection />
    </section>
  );
}
