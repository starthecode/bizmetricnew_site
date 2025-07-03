import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  defaultIndustryData,
  defaultThreeBoxesData,
} from '../../../../lib/pageFields';
import PollFields from '../../../../components/Form_Fields/PollFields';
import ThreeBoxes from '../../../../components/DashComponents/ServicesPage/ThreeBoxes';
import BackButton from '../../BackButton';

export default function PostCustomizer() {
  const { currentUser } = useSelector((state) => state.user);

  const { slug } = useParams();

  const [formData, setFormData] = React.useState({
    pollData: {
      title: '',
      items: [defaultThreeBoxesData],
    },
    verticlesData: {
      title: '',
      items: [defaultIndustryData],
    },
  });

  const sectionsRef = React.useRef({
    poll: null,
    verticles: null,
  });

  React.useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;

      try {
        const res = await fetch(`/api/customize/get/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch page data');
          return;
        }

        const contentArray = data.content || [];

        const casestudiesBox1Content = contentArray.find(
          (item) => item.type === 'verticles'
        );

        const casestudiesBox2Content = contentArray.find(
          (item) => item.type === 'poll'
        );

        if (casestudiesBox1Content?.data) {
          setFormData((prev) => ({
            ...prev,
            pollData: {
              title: casestudiesBox1Content?.data?.title || '',
              items: casestudiesBox1Content?.data?.items || [],
            },

            inputBoxesData2: {
              title: casestudiesBox2Content?.data?.title || '',
              items: casestudiesBox2Content?.data?.items || '',
            },
          }));
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    };

    fetchPage();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pollData = sectionsRef.current.poll?.getData?.();

    const verticlesData = sectionsRef.current.verticles?.getData?.();

    //select content as per template
    const getTemplateContent = () => {
      switch (slug) {
        case 'verticles':
          return [
            {
              type: 'verticles',
              data: verticlesData,
            },
          ];

        case 'poll':
          return [
            {
              type: 'poll',
              data: pollData,
            },
          ];

        default:
          return [];
      }
    };

    const payload = {
      userId: currentUser?._id || '',
      content: getTemplateContent(),
      slug,
    };

    try {
      const response = await fetch(`/api/customizer/update/${slug}`, {
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
      <BackButton />
      <form className="mt-10" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-xl capitalize font-bold">{slug} Section</h2>
          {slug === 'poll' ? (
            <PollFields
              ref={(el) => (sectionsRef.current.poll = el)}
              pollData={formData?.pollData}
            />
          ) : slug === 'verticles' ? (
            <ThreeBoxes
              ref={(el) => (sectionsRef.current.poll = el)}
              threeBoxesData={formData?.verticlesData}
            />
          ) : (
            ''
          )}
        </div>

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
