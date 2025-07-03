import React from 'react';
import toast from 'react-hot-toast';
import { defaultIndustryData } from '../../../lib/pageFields';
import IndustryComp from '../../../components/DashComponents/Slider/IndustryComp';
import { useSelector } from 'react-redux';

export default function IndustryVerticles() {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = React.useState({
    industryTitle: '',
    industryData: [defaultIndustryData],
  });

  const sectionsRef = React.useRef({
    industry: null,
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

        const industryContent = contentArray.find(
          (item) => item.type === 'industry'
        );


        if (industryContent?.data) {
          setFormData((prev) => ({
            ...prev,
            industryTitle: industryContent.data.title || '',
            industryData: industryContent.data.items || [],
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

    const currentIndustryData =
      sectionsRef.current.industry?.getIndustryData?.();

    const customizeContent = [
      {
        type: 'industry',
        data: {
          title: formData.industryTitle,
          items: currentIndustryData,
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
      <h2 className="text-xl">Industry Verticles</h2>
      <form className="mt-10" onSubmit={handleSubmit}>
        <IndustryComp
          ref={(el) => (sectionsRef.current.industry = el)}
          industryData={formData?.industryData}
          industryTitle={formData?.industryTitle}
          setIndustryTitle={(title) =>
            setFormData((prev) => ({ ...prev, industryTitle: title }))
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
