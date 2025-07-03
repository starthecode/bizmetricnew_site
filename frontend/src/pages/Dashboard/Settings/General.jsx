import React from 'react';
import InputLabel from '../../../components/Form_Fields/InputLabel';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function General() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = React.useState({
    googleId: '',
    userId: currentUser?._id || '',
  });

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch settings');
          return;
        }


        // Update formData with data from response
        if (data?.settings?.length > 0) {
          setFormData((prev) => ({
            ...prev,
            ...data.settings[0], // ← fix: use first item
          }));
        }
      } catch (error) {
        toast.error('An error occurred while fetching settings');
        console.error('fetchSettings error:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/settings/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result?.success) {
        toast.success('Settings Updated');
      } else {
        toast.error(result.message || 'Failed to update settings');
      }
    } catch (error) {
      toast.error('Submission error');
      console.error('Submission error:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl">General Settings</h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <InputLabel
          label="Google Analytic ID"
          name="googleId"
          type="text"
          placeholder="Enter Google Analytic ID"
          value={formData.googleId || ''}
          onChange={handleChange}
        />
        {/* Add more setting fields here in future */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
