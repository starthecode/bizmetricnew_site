import React from 'react';
import { useSelector } from 'react-redux';
import InputGroup from '../InputGroup';
import toast from 'react-hot-toast';

import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from '../../redux/slices/userSlice';

import { useDispatch } from 'react-redux';

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [imgFile, setImageFile] = React.useState(null);
  const [formData, setFormData] = React.useState({
    userName: currentUser.userName || '',
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email || '',
    password: '',
  });

  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { type, id, files, value } = e.target;

    if (id) {
      setFormData((prev) => ({ ...prev, [id]: value.trim() }));
    }

    if (type === 'file') {
      setImageFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      toast.error('No changes made');
      return;
    }

    try {
      dispatch(updateStart());
      let uploadedImagePath;
      if (imgFile) {
        const formData = new FormData();
        formData.append('file', imgFile);

        const res1 = await fetch('/api/file/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res1.ok) {
          const err = await res1.text();
          toast.error(err);
        }

        const fileData = await res1.json();

        uploadedImagePath = fileData?.fileUrl || currentUser.profilePicture;


        // uploadedImagePath = currentUser.profilePicture;
        // if (fileData) {
        //   uploadedImagePath = fileData.filePath;
        // }
      }

      const finalPayload = {
        ...formData,
        profilePicture: uploadedImagePath,
      };

      const endpoint = `/api/user/update/${currentUser._id}`;

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
      }
      // toast.success('Profile updated!');
    } catch (error) {
      dispatch(updateFailure(error.message));
      toast.error(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center self-center">
      <div>
        <button onClick={handleSignout}>Sign Out</button>
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
                  : `${currentUser.profilePicture}`
              }
              alt="user avatar"
            />
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM5 14v-1.586l7.586-7.586 1.586 1.586L6.586 14H5z" />
              </svg>
            </div>
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

        {currentUser.isAdmin && (
          <a href="/dashboard/post-new" className="w-full btn-secondary">
            Create Post
          </a>
        )}
      </form>
    </div>
  );
};
