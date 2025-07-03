import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/slices/userSlice';
import InputGroup from './InputGroup';

export const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/+/, '');
  const isSignup = pathname.includes('signup');

  const [formData, setFormData] = React.useState({ email: '', password: '' });

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }

    try {
      dispatch(signInStart());
      const endpoint = isSignup
        ? '/api/auth/signup'
        : '/api/auth/signin';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      toast.success(
        isSignup ? 'Account created successfully!' : 'Login successful!'
      );

      if (res.ok) {
        dispatch(signInSuccess(data));
        if (isSignup) {
          navigate('/signin'); // Redirect to signin after signup
        } else {
          navigate('/dashboard?tab=main'); // Redirect to dashboard after login
        }
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="text-center">
                <a href="/#" className="mx-auto inline-block max-w-[90px]">
                  <img src="/assets/imgs/logo.png" alt="logo" />
                </a>
              </div>

              <p className="py-8 text-lg">
                {isSignup ? 'Sign Up Now' : 'Welcome - Please Sign In'}
              </p>

              {errorMessage && (
                <span className="block mb-5 text-red-500">{errorMessage}</span>
              )}

              <form onSubmit={handleAuthSubmit}>
                <InputGroup
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                  onChange={handleChange}
                />
                <InputGroup
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
                <div className="mb-10">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? 'Please wait...'
                      : isSignup
                      ? 'Sign Up'
                      : 'Sign In'}
                  </button>
                </div>
              </form>

              {!isSignup && (
                <a
                  href="/#"
                  className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
                >
                  Forgot Password?
                </a>
              )}

              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">
                  {isSignup ? 'Already have an account?' : 'Not a member yet?'}
                </span>
                <a
                  href={isSignup ? '/signin' : '/signup'}
                  className="text-primary hover:underline"
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
