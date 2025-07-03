import { useLocation } from 'react-router-dom';

export const usePageTitle = (postId) => {
  const location = useLocation();
  const slug = location.pathname.split('/').pop();

  if (postId) return 'Edit';
  if (slug === 'post-new') return 'Post';
  if (slug === 'page-new') return 'Page';
  if (slug === 'new-solution') return 'Solution';
  return slug;
};
