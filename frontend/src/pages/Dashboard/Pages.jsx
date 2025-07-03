import React, { useEffect, useState } from 'react';
import TableComp from '../../components/DashComponents/Table';
import toast from 'react-hot-toast';

export const Pages = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch('/api/page/getPages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch pages');
        } else {
          setPages(data.pages || []);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <TableComp type="page" data={pages} />
      )}
    </div>
  );
};
