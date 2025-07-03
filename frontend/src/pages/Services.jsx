import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TempServices from '../components/Templates/TempServices';
import NotFound from '../NotFound';
import NumericLoader from '../components/Loader/NumericLoader';
import SeoComp from '../components/SeoComp';

export default function Services() {
  const { slug } = useParams();

  const startTime = Date.now();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [seoData, setSeoData] = useState({});

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      setLoading(true);
      setData(null);
      setTitle('');
      setNotFound(false);

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
        setTitle(json.title);
        setSeoData(json?.seo);
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
    <div id="services">
      <SeoComp
        seoTitle={seoData?.seoTitle}
        description={seoData?.seoDescription}
        keywords={seoData?.focusKeyphrase}
        image={seoData?.image}
        url={`https://yourdomain.com/blog/${seoData?.slug}`}
      />
      <TempServices data={data} title={title} />;
    </div>
  );
}
