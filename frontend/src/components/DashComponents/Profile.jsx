// import React from 'react';
// import { useSelector } from 'react-redux';
// import InputGroup from '../InputGroup';
// import toast from 'react-hot-toast';

// import {
//   updateStart,
//   updateSuccess,
//   updateFailure,
//   signoutSuccess,
// } from '../../redux/slices/userSlice';

// import { useDispatch } from 'react-redux';
// import { handleSignout } from '../../utils/api';
// import { useLocation } from 'react-router-dom';

// export const Profile = () => {
//   const slug = useLocation();

//   console.log('slug', slug);

//   const { currentUser } = useSelector((state) => state.user);

//   const [imgFile, setImageFile] = React.useState(null);
//   const [formData, setFormData] = React.useState({
//     userName: currentUser.userName || '',
//     firstName: currentUser.firstName || '',
//     lastName: currentUser.lastName || '',
//     email: currentUser.email || '',
//     password: '',
//   });

//   const { loading } = useSelector((state) => state.user);

//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { type, id, files, value } = e.target;

//     if (id) {
//       setFormData((prev) => ({ ...prev, [id]: value.trim() }));
//     }

//     if (type === 'file') {
//       setImageFile(files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (Object.keys(formData).length === 0) {
//       toast.error('No changes made');
//       return;
//     }

//     try {
//       dispatch(updateStart());
//       let uploadedImagePath;
//       if (imgFile) {
//         const formData = new FormData();
//         formData.append('file', imgFile);

//         const res1 = await fetch('/api/file/upload', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!res1.ok) {
//           const err = await res1.text();
//           toast.error(err);
//         }

//         const fileData = await res1.json();

//         uploadedImagePath = fileData?.fileUrl || currentUser.profilePicture;

//         // uploadedImagePath = currentUser.profilePicture;
//         // if (fileData) {
//         //   uploadedImagePath = fileData.filePath;
//         // }
//       }

//       const finalPayload = {
//         ...formData,
//         profilePicture: uploadedImagePath,
//       };

//       const endpoint = `/api/user/update/${currentUser._id}`;

//       const res = await fetch(endpoint, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(finalPayload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         dispatch(updateFailure(data.message));
//         toast.error(data.message);
//       } else {
//         dispatch(updateSuccess(data));
//         toast.success("User's profile updated successfully");
//       }
//       // toast.success('Profile updated!');
//     } catch (error) {
//       dispatch(updateFailure(error.message));
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center justify-center text-center self-center">
//       <div>
//         <button onClick={() => handleSignout(dispatch, signoutSuccess)}>
//           Logout
//         </button>
//       </div>
//       <form onSubmit={handleSubmit} className="flex-col flex mt-10 w-[600px]">
//         <div className="flex items-center justify-center mb-5 relative">
//           <input
//             accept="image/*"
//             className="hidden"
//             type="file"
//             id="userAvatarUpload"
//             onChange={handleChange}
//           />

//           <label htmlFor="userAvatarUpload" className="cursor-pointer relative">
//             <img
//               className="rounded-full w-20 h-20 object-cover border-2 border-gray-300"
//               src={
//                 imgFile
//                   ? URL.createObjectURL(imgFile)
//                   : `${currentUser.profilePicture}`
//               }
//               alt="user avatar"
//             />
//             <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-gray-600"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM5 14v-1.586l7.586-7.586 1.586 1.586L6.586 14H5z" />
//               </svg>
//             </div>
//           </label>
//         </div>

//         {/* Inputs */}
//         <InputGroup
//           type="text"
//           name="userName"
//           placeholder="username"
//           id="userName"
//           value={formData.userName}
//           onChange={handleChange}
//         />
//         <div className="flex gap-2">
//           <InputGroup
//             type="text"
//             name="firstName"
//             placeholder="firstName"
//             id="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//           <InputGroup
//             type="text"
//             name="lastName"
//             placeholder="lastName"
//             id="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </div>
//         <InputGroup
//           disabled={true}
//           type="email"
//           name="email"
//           placeholder="email"
//           id="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <InputGroup
//           type="password"
//           name="password"
//           placeholder="Update Password"
//           id="password"
//           onChange={handleChange}
//         />

//         <div className="mb-5">
//           <button
//             type="submit"
//             className="w-full btn-primary disabled:bg-flamingo-200"
//             disabled={loading}
//           >
//             {loading ? 'Please wait...' : 'Update'}
//           </button>
//         </div>

//         {currentUser.isAdmin && (
//           <a href="/dashboard/post-new" className="w-full btn-secondary">
//             Create Post
//           </a>
//         )}
//       </form>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InputGroup from '../InputGroup';
import toast from 'react-hot-toast';

import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from '../../redux/slices/userSlice';

import { handleSignout } from '../../utils/api';

export const Profile = () => {
  const { slug } = useParams(); // 👈 get slug from URL
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const [imgFile, setImageFile] = useState(null);
  const [userData, setUserData] = useState(null); // store fetched user
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  // ✅ Fetch user by slug on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getUser/${slug}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          const err = await res.json();
          toast.error(err.message || 'Failed to fetch user');
          return;
        }

        const data = await res.json();

        setUserData(data);

        // pre-fill form
        setFormData({
          userName: data.userName || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          password: '',
          role: data.role || '',
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUser();
  }, [slug]);

  const handleChange = (e) => {
    const { type, id, files, value } = e.target;

    if (id) {
      setFormData((prev) => ({ ...prev, [id]: value.trim() }));
    }

    if (e.target.name === 'role') {
      setFormData((prev) => ({ ...prev, role: value }));
    }

    if (type === 'file') {
      setImageFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) return;

    if (Object.keys(formData).length === 0) {
      toast.error('No changes made');
      return;
    }

    try {
      dispatch(updateStart());
      let uploadedImagePath = userData.profilePicture;

      if (imgFile) {
        const formDataFile = new FormData();
        formDataFile.append('file', imgFile);

        const res1 = await fetch('/api/file/upload', {
          method: 'POST',
          body: formDataFile,
        });

        if (!res1.ok) {
          const err = await res1.text();
          toast.error(err);
        } else {
          const fileData = await res1.json();
          uploadedImagePath = fileData?.fileUrl || userData.profilePicture;
        }
      }

      const finalPayload = {
        ...formData,
        profilePicture: uploadedImagePath,
      };

      const endpoint = `/api/user/update/${userData._id}`;

      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(finalPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(updateSuccess(data));
        toast.success("User's profile updated successfully");
        setUserData(data); // update local user data
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(error.message);
    }
  };

  const isAdmin =
    userData && userData?.isAdmin === true && userData?.role.includes('admin');

  if (!userData) {
    return <div className="text-center mt-10">Loading user...</div>;
  }

  console.log('userData', isAdmin);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center self-center">
      <div>
        <button onClick={() => handleSignout(dispatch, signoutSuccess)}>
          Logout
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex-col flex mt-10 w-[600px]">
        <div className="flex items-center justify-center mb-5 relative">
          <input
            accept="image/*"
            className="hidden"
            type="file"
            id="userAvatarUpload"
            onChange={handleChange}
          />

          <label htmlFor="userAvatarUpload" className="cursor-pointer relative">
            <img
              className="rounded-full w-20 h-20 object-cover border-2 border-gray-300"
              src={
                imgFile
                  ? URL.createObjectURL(imgFile)
                  : `${userData.profilePicture}`
              }
              alt="user avatar"
            />
          </label>
        </div>

        {/* Inputs */}
        <InputGroup
          type="text"
          name="userName"
          placeholder="username"
          id="userName"
          value={formData.userName}
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <InputGroup
            type="text"
            name="firstName"
            placeholder="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputGroup
            type="text"
            name="lastName"
            placeholder="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="w-full max-w-xs mb-5">
          {!isAdmin ? (
            <span className="capitalize text-left">
              User Type: <strong>{userData?.role}</strong>
            </span>
          ) : (
            <select
              name="role"
              id="true-false"
              value={formData?.role}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="subscriber">Subscriber</option>
              <option value="hr">HR</option>
            </select>
          )}
        </div>
        <InputGroup
          disabled={true}
          type="email"
          name="email"
          placeholder="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputGroup
          type="password"
          name="password"
          placeholder="Update Password"
          id="password"
          onChange={handleChange}
        />

        <div className="mb-5">
          <button
            type="submit"
            className="w-full btn-primary disabled:bg-flamingo-200"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Update'}
          </button>
        </div>

        {userData.isAdmin && (
          <a href="/dashboard/post-new" className="w-full btn-secondary">
            Create Post
          </a>
        )}
      </form>
    </div>
  );
};
