import MoreContent from '../SingleBlog/MoreContent';
import { useLocation } from 'react-router-dom';

export default function EmbedBox({ data, moreContent }) {
  const location = useLocation();

  // Example: /Newsletters/bizmetric-newsletter-june-25
  const path = location.pathname;

  // Split the path and get the segment you want
  const type = path.split('/')[1]; // This will be "Newsletters"

  return (
    <div className="flex-1">
      <div className="relative max-w-3xl mb-10">
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </div>
      <MoreContent type={type} moreContent={moreContent} />
    </div>
  );
}
