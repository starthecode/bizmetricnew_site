import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TempAboutus from '../components/Templates/TempAboutus';
import NotFound from '../NotFound';
import FrontLoader from '../components/Loader/FrontLoader';

export default function AboutUsPage() {
  const slug = 'about-us';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const startTime = Date.now();

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      setLoading(true);
      setData(null);
      setNotFound(false);

      try {
        const res = await fetch(`/api/page/getpage/${slug}`, {
          method: 'GET',
          cache: 'force-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        console.log('json', json);

        if (!res.ok || !json?.title) {
          setNotFound(true);
          return;
        }

        setData(json);
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

  return <TempAboutus data={data} />;
}
