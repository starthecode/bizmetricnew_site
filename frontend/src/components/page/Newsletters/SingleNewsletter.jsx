import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion, useAnimation } from 'framer-motion';
import { useParams } from 'react-router-dom';
import NotFound from '../../../NotFound';
import NumericLoader from '../../Loader/NumericLoader';
import PagePostHero from '../../HeroSection/PagePostHero';
import EmbedBox from './EmbedBox';
import PagePostSidebar from '../../extras/PagePostSidebar';

export default function SingleNewsletter() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [moreContent, setMoreContent] = useState([]);

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
        const res = await fetch(`/api/newsletters/singleNewsletter/${slug}`, {
          method: 'GET',
          // cache: 'force-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (!res.ok || !json?.newsletter?.title) {
          setNotFound(true);
          return;
        }

        setData(json?.newsletter);

        setMoreContent(json.moreNewsletters || []);

        setPageHeaderData({
          smalltitle: 'Newsletter',
          title: json?.newsletter?.title || '',
          excerpts: json?.newsletter?.excerpts || '',
          bannerImg: json?.newsletter?.metaFields?.featuredImage || '',
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
    <section className="pb-20">
      <PagePostHero alignCenter="true" {...pageHeaderData} />
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <EmbedBox data={data?.embedcontent} moreContent={moreContent} />
          <PagePostSidebar />
        </div>
      </div>
    </section>
  );
}
