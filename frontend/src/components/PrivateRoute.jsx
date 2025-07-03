import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../redux/slices/userSlice';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      if (currentUser?.token) {
        try {
          const decoded = jwt_decode(currentUser.token);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            await fetch('/api/user/signout', { method: 'POST' });
            dispatch(signoutSuccess());
            setRedirectToSignin(true);
          }
        } catch (err) {
          await fetch('/api/user/signout', { method: 'POST' });
          dispatch(signoutSuccess());
          setRedirectToSignin(true);
          console.log('Error:', err);
        }
      }
      setCheckingAuth(false);
    };

    checkToken();
  }, [currentUser, dispatch]);

  if (checkingAuth) return null; // or a loading spinner

  if (!currentUser || redirectToSignin) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}
