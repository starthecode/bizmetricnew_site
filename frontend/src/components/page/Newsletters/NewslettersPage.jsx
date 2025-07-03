import { useEffect, useState } from 'react';
import SingleNewsletterBox from './SingleNewsletterBox';
import NewsletterContent from './NewsletterContent';

export default function NewslettersPage() {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/newsletters/getNewsletters');
        const data = await res.json();

        console.log('data', data);

        if (!res.ok) {
          console.error(data.message || 'Failed to fetch newsletters');
        } else {
          // Sort newsletters by date (descending)
          const sorted = [...(data.posts || [])].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setNewsletters(sorted);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPosts();
  }, []);

  const latestNewsletter = newsletters[0];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {latestNewsletter && (
        <SingleNewsletterBox newsletter={latestNewsletter} />
      )}
      {newsletters.length > 0 && (
        <NewsletterContent newsletters={newsletters} />
      )}
    </div>
  );
}
