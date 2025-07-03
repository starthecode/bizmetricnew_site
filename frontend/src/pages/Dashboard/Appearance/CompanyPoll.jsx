import React from 'react';
import toast from 'react-hot-toast';
import { defaultThreeBoxesData } from '../../../lib/pageFields';
import { useSelector } from 'react-redux';
import PollFields from '../../../components/Form_Fields/PollFields';

export default function CompanyPoll() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = React.useState({
    pollTitle: '',
    pollData: [
      {
        pollinput1: '',
      },
    ],
  });

  const sectionsRef = React.useRef({
    poll: null,
  });

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/customizer/get', {
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

        const contentArray = data?.customizers[0].content || [];

        const pollContent = contentArray.find((item) => item.type === 'poll');

        if (pollContent?.data) {
          setFormData((prev) => ({
            ...prev,
            pollTitle: pollContent.data.title || '',
            pollData: pollContent.data.items || [],
          }));
        }
      } catch (error) {
        toast.error('An error occurred while fetching settings');
        console.error('fetchSettings error:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentpollData = sectionsRef.current.poll?.getData?.();

    const customizeContent = [
      {
        type: 'poll',
        data: {
          title: formData.pollTitle,
          items: currentpollData,
        },
      },
    ];

    const payload = {
      userId: currentUser?._id || '',
      content: customizeContent,
    };

    try {
      const response = await fetch('/api/customizer/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
      <h2 className="text-xl">Poll Section</h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <PollFields
          ref={(el) => (sectionsRef.current.poll = el)}
          pollData={formData?.pollData}
          pollTitle={formData?.pollTitle}
          setPollTitle={(title) =>
            setFormData((prev) => ({ ...prev, pollTitle: title }))
          }
        />

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
