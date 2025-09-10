import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function PermissionPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  const { isAdmin } = currentUser;

  // If admin, allow all routes
  if (isAdmin) {
    return <Outlet />;
  }

  const isHR = currentUser?.role?.includes('hr');

  const isUser = currentUser?.role?.includes('user');

  // HR role: only allow dashboard, profile, careers
  if (isHR) {
    const allowedPaths = [
      '/dashboard',
      '/dashboard/user/:slug',
      '/dashboard/careers',
      '/dashboard/new-career',
    ];
    const currentPath = location.pathname.toLowerCase();

    if (allowedPaths.some((path) => currentPath.startsWith(path))) {
      return <Outlet />;
    }

    return <Navigate to="/signin" />;
  } else if (isUser) {
    const allowedPaths = [
      '/dashboard/posts',
      '/dashboard/new-post',
      `/dashboard/users/user/${currentUser?._id}`,
    ];
    const currentPath = location.pathname.toLowerCase();

    if (allowedPaths.some((path) => currentPath.startsWith(path))) {
      return <Outlet />;
    }

    return <Navigate to="/signin" />;
  }

  // Default: block
  return <Navigate to="/signin" />;
}
