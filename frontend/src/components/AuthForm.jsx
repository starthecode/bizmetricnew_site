// import React from 'react';
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';

// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from '../redux/slices/userSlice';
// import InputGroup from './InputGroup';

// export const AuthForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const pathname = location.pathname.replace(/^\/+/, '');
//   const isSignup = pathname.includes('signup');

//   const [formData, setFormData] = React.useState({ email: '', password: '' });

//   const { loading, error: errorMessage } = useSelector((state) => state.user);

//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };

//   const handleAuthSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email || !formData.password) {
//       return dispatch(signInFailure('Please fill out all fields'));
//     }

//     //otp login here /api/otp/getOtp

//     try {
//       dispatch(signInStart());
//       const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/signin';
//       const res = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`Error ${res.status}: ${errorText}`);
//       }

//       const data = await res.json();

//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//       }

//       toast.success(
//         isSignup ? 'Account created successfully!' : 'Login successful!'
//       );

//       if (res.ok) {
//         dispatch(signInSuccess(data));
//         if (isSignup) {
//           navigate('/signin'); // Redirect to signin after signup
//         } else {
//           navigate('/dashboard?tab=main'); // Redirect to dashboard after login
//         }
//       }
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
//       <div className="container mx-auto">
//         <div className="-mx-4 flex flex-wrap">
//           <div className="w-full px-4">
//             <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
//               <div className="text-center">
//                 <a href="/#" className="mx-auto inline-block max-w-[90px]">
//                   <img src="/assets/imgs/logo.png" alt="logo" />
//                 </a>
//               </div>

//               <p className="py-8 text-lg">
//                 {isSignup ? 'Sign Up Now' : 'Welcome - Please Sign In'}
//               </p>

//               {errorMessage && (
//                 <span className="block mb-5 text-red-500">{errorMessage}</span>
//               )}

//               <form onSubmit={handleAuthSubmit}>
//                 <InputGroup
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   id="email"
//                   onChange={handleChange}
//                 />
//                 <InputGroup
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   id="password"
//                   onChange={handleChange}
//                 />
//                 <div className="mb-10">
//                   <AuthButton
//                     type="submit"
//                     className="btn-primary"
//                     disabled={loading}
//                   >
//                     {loading
//                       ? 'Please wait...'
//                       : isSignup
//                       ? 'Sign Up'
//                       : 'Sign In'}
//                   </AuthButton>
//                 </div>
//               </form>

//               {!isSignup && (
//                 <a
//                   href="/#"
//                   className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
//                 >
//                   Forgot Password?
//                 </a>
//               )}

//               <p className="text-base text-body-color dark:text-dark-6">
//                 <span className="pr-0.5">
//                   {isSignup ? 'Already have an account?' : 'Not a member yet?'}
//                 </span>
//                 <a
//                   href={isSignup ? '/signin' : '/signup'}
//                   className="text-primary hover:underline"
//                 >
//                   {isSignup ? 'Sign In' : 'Sign Up'}
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

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
import { AuthButton } from './Buttons/AuthButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.replace(/^\/+/, '');
  const isSignup = pathname.includes('signup');

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = React.useState('');
  const [isOtpSent, setIsOtpSent] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isForgotPass, setIsForgotPass] = React.useState(false);
  const [isOtpVerified, setIsOtpVerified] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(signInFailure(''));
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      return dispatch(signInFailure('Please provide email'));
    }

    if (!isForgotPass && !formData.password) {
      return dispatch(signInFailure('Please provide password'));
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/otp/getOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: isForgotPass ? undefined : formData.password,
          type: isSignup ? 'signup' : isForgotPass ? 'forgotpass' : 'signin',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to send OTP');
      }

      setIsLoading(false);
      setIsOtpSent(true);
      setTimeLeft(60);
      toast.success('OTP sent to your email');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  // Timer for Resend
  React.useEffect(() => {
    if (isOtpSent && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isOtpSent, timeLeft]);

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    if (!otp) {
      return dispatch(signInFailure('Please enter OTP'));
    }

    setIsLoading(true);

    try {
      const otpRes = await fetch('/api/otp/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp,
          type: isSignup ? 'signup' : isForgotPass ? 'forgotpass' : 'signin',
        }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        throw new Error(otpData.error || 'Invalid OTP');
      }

      setIsLoading(false);
      setIsOtpVerified(true);

      if (isForgotPass) {
        toast.success('OTP verified. Please set your new password.');
      } else {
        await handleAuthAfterOtp();
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleAuthAfterOtp = async () => {
    dispatch(signInStart());

    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/signin';
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
        return;
      }

      dispatch(signInSuccess(data));
      toast.success(
        isSignup ? 'Account created successfully!' : 'Login successful!'
      );

      if (isSignup) {
        navigate('/signin');
      } else {
        navigate('/dashboard?tab=main');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      return dispatch(signInFailure('Please fill out all password fields'));
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return dispatch(signInFailure('Passwords do not match'));
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/updatePass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || data.message || 'Failed to update password'
        );
      }

      setIsLoading(false);
      toast.success('Password updated successfully!');

      setIsForgotPass(false);
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setFormData({
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
      });
      setOtp('');
    } catch (error) {
      setIsLoading(false);
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };

  const resetForgotPasswordFlow = () => {
    setIsForgotPass(false);
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setFormData({ ...formData, newPassword: '', confirmPassword: '' });
    setOtp('');
  };

  const getButtonText = () => {
    if (isOtpSent && !isOtpVerified) return 'Verify OTP';
    if (isOtpVerified && isForgotPass) return 'Update Password';

    if (isSignup) return 'Sign Up';
    if (isForgotPass) return 'Send OTP';
    return 'Sign In';
  };

  return (
    <section className="min-h-screen bg-flamingo-100 py-20 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
              <div className="text-center mb-8 w-full flex flex-col justify-center items-center">
                <img
                  src="/assets/imgs/logo.png"
                  alt="logo"
                  className="w-20 h-20 object-contain"
                />

                <h1 className="text-3xl font-bold text-gray-900 mt-6">
                  {isSignup
                    ? 'Create Account'
                    : isForgotPass
                    ? isOtpVerified
                      ? 'Set New Password'
                      : 'Reset Password'
                    : 'Welcome Back'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {isSignup
                    ? 'Join us today and get started'
                    : isForgotPass
                    ? isOtpVerified
                      ? 'Enter your new password below'
                      : 'Enter your email to receive a verification code'
                    : 'Sign in to your account to continue'}
                </p>
              </div>
              {errorMessage && (
                <div className="mb-6 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <span className="text-red-600 dark:text-red-400 text-sm font-medium">
                    {errorMessage}
                  </span>
                </div>
              )}

              {!isOtpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-6">
                  <InputGroup
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                  />

                  {!isForgotPass && (
                    <div className="relative overflow-hidden">
                      <InputGroup
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full"
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 flex my-auto h-10"
                      >
                        {showPassword ? (
                          <FaEyeSlash size={18} />
                        ) : (
                          <FaEye size={18} />
                        )}
                      </button>
                    </div>
                  )}

                  <AuthButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    {getButtonText()}
                  </AuthButton>
                </form>
              ) : !isOtpVerified ? (
                <form onSubmit={handleOtpVerify} className="space-y-6">
                  <InputGroup
                    type="text"
                    name="otp"
                    placeholder="Enter verification code"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.trim())}
                    className="w-full text-center text-lg tracking-widest"
                  />

                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Enter the 6-digit code sent to your email
                    </p>
                  </div>

                  <AuthButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    Verify Code
                  </AuthButton>

                  <AuthButton
                    variant="secondary"
                    onClick={handleSendOtp}
                    disabled={timeLeft > 0 || isLoading}
                    type="button"
                  >
                    {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend Code'}
                  </AuthButton>
                </form>
              ) : isForgotPass ? ( // Only show password reset form for forgot password flow
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <InputGroup
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full"
                  />

                  <InputGroup
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full"
                  />

                  <AuthButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                  >
                    Update Password
                  </AuthButton>
                </form>
              ) : (
                // For regular login/signup after OTP verification, show nothing or a loading state
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Completing your request...
                  </p>
                </div>
              )}
              <div className="mt-8 space-y-4">
                {!isSignup && !isForgotPass && !isOtpSent && (
                  <AuthButton
                    variant="text"
                    onClick={() => setIsForgotPass(true)}
                    className="text-sm"
                  >
                    Forgot your password?
                  </AuthButton>
                )}

                {isForgotPass && (
                  <AuthButton
                    variant="text"
                    onClick={resetForgotPasswordFlow}
                    className="text-sm"
                  >
                    ← Back to Sign In
                  </AuthButton>
                )}

                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {isSignup
                      ? 'Already have an account?'
                      : 'Not a member yet?'}{' '}
                    <a
                      href={isSignup ? '/signin' : '/signup'}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
                    >
                      {isSignup ? 'Sign In' : 'Sign Up'}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
