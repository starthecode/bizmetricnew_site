import { useParams } from 'react-router-dom';
import PagePostHero from './HeroSection/PagePostHero';
import NotFound from '../NotFound';
import NumericLoader from './Loader/NumericLoader';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import BlogContent from './page/SingleBlog/BlogContent';
import MoreContent from './page/SingleBlog/MoreContent';

export default function BlogSingle() {
  const { slug } = useParams();
  const startTime = Date.now();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [moreContent, setMoreContent] = useState([]);

  const [pageHeaderData, setPageHeaderData] = useState({
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
        const res = await fetch(`/api/blog/getblog/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (!res.ok || !json?.blog?.title) {
          setNotFound(true);
          return;
        }
        setMoreContent(json.moreBlogs || []);

        setData(json.blog);
        setPageHeaderData({
          title: 'Blog',
          excerpts: json.blog.excerpts || '',
          bannerImg: json.blog.metaFields?.featuredImage || '',
          customMetaTitle: json?.blog?.title || '',
          customMetaDesc: json?.blog?.customMetaFields?.customMetaDesc || '',
          customMetaLink: json?.blog?.customMetaFields?.customMetaLink || '',
          customMetaLinkText:
            json?.blog?.customMetaFields?.customMetaLinkText || '',
          customMetaLinkTwo:
            json?.blog?.customMetaFields?.customMetaLinkTwo || '',
          customMetaLinkTwoText:
            json?.blog?.customMetaFields?.customMetaLinkTwoText || '',
          customMetaExtra: json?.blog?.customMetaFields?.customMetaExtra || '',
          customMetaExtra2:
            json?.blog?.customMetaFields?.customMetaExtra2 || '',
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
      <PagePostHero {...pageHeaderData} />
      <div className="container mt-20">
        <BlogContent content={data?.content} metaFields={data?.metaFields} />

        <MoreContent moreContent={moreContent} />
      </div>
    </section>
  );
}
