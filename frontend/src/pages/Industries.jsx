import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TempIndustries from '../components/Templates/TempIndustries';
import NotFound from '../NotFound';
import NumericLoader from '../components/Loader/NumericLoader';

export default function Industries() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  const [title, setTitle] = useState('');

  const [notFound, setNotFound] = useState(false);

  const startTime = Date.now();

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      setLoading(true);
      setData(null);
      setTitle('');
      setNotFound(false);

      try {
        setLoading(true);
        const res = await fetch(`/api/page/getpage/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (!res.ok) {
          setNotFound(true);
          return;
        }

        setData(json && json);
        setTitle(json?.title);

        const newSections = {};
        for (const section of json?.content || []) {
          newSections[section.type] = section.data || [];
        }
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

  return <TempIndustries data={data} title={title} />;
}
