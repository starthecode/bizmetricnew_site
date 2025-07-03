import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import TableComp from '../../components/DashComponents/Table';

export const CaseStudies = () => {
  const [caseStudiesData, setCaseStudiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/casestudies/getCaseStudies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        console.log('data', data);

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch pages');
        } else {
          setCaseStudiesData(data.posts || []);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <TableComp type="casestudies" data={caseStudiesData} />
      )}
    </div>
  );
};
