import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TempServices from '../components/Templates/TempServices';
import NotFound from '../NotFound';
import FrontLoader from '../components/Loader/FrontLoader';
import PagePostHero from '../components/HeroSection/PagePostHero';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import TempLiftAtBiz from '../components/Templates/TempLiftAtBiz';
import TempAboutus from '../components/Templates/TempAboutus';
import TempContactus from '../components/Templates/TempContactus';
import NumericLoader from '../components/Loader/NumericLoader';
import NewslettersPage from '../components/page/Newsletters/NewslettersPage';

export default function SharedPage() {
  const { slug } = useParams();

  console.log('slug', slug);

  const startTime = Date.now();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [pageHeaderData, setPageHeaderData] = React.useState({
    title: '',
    excerpts: '',
    bannerImg: '',
    customMetaTitle: '',
    customMetaDesc: '',
    customMetaLink: '',
    customMetaLinkText: '',
    customMetaLinkTwo: '',
    customMetaLinkTwoText: '',
    customMetaExtra: '',
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

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      setLoading(true);
      setData(null);
      setNotFound(false);

      const startTime = Date.now();

      try {
        const res = await fetch(`/api/page/getpage/${slug}`, {
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
        setPageHeaderData({
          title: json.title || '',
          excerpts: json.excerpts || '',
          bannerImg: json.metaFields?.featuredImage || '',
          customMetaTitle: json?.customMetaFields?.customMetaTitle || '',
          customMetaDesc: json?.customMetaFields?.customMetaDesc || '',
          customMetaLink: json?.customMetaFields?.customMetaLink || '',
          customMetaLinkText: json?.customMetaFields?.customMetaLinkText || '',
          customMetaLinkTwo: json?.customMetaFields?.customMetaLinkTwo || '',
          customMetaLinkTwoText:
            json?.customMetaFields?.customMetaLinkTwoText || '',
          customMetaExtra: json?.customMetaFields?.customMetaExtra || '',
          customMetaExtra2: json?.customMetaFields?.customMetaExtra2 || '',
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
    <>
      <PagePostHero alignCenter={false} type={slug} {...pageHeaderData} />
      {slug === 'life-at-bizmetric' ? (
        <TempLiftAtBiz data={data} />
      ) : slug === 'about-us' ? (
        <TempAboutus data={data} type={slug} />
      ) : slug === 'contact-us' ? (
        <TempContactus data={data} type={slug} />
      ) : slug === 'newsletters' ? (
        <NewslettersPage />
      ) : (
        ''
      )}
    </>
  );
}
