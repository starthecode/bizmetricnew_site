import React from 'react';
import BlogArchive from '../components/BlogArchive';
import toast from 'react-hot-toast';

export default function Blogs() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPosts/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (!res.ok) {
          toast.error(json.message || 'Failed to fetch page data');
          return;
        }

        setData(json.posts || []);
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  return <BlogArchive data={data} />;
}
