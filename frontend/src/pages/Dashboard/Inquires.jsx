import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InquiryTable from '../../components/DashComponents/InquiryTable';

export const Inquires = () => {
  const [inquires, setInquires] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/contact/getInquires', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || 'Failed to fetch inquiries');
      } else {
        setInquires(data || []);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDeleteInquiry = async (id) => {
    console.log('id', id);

    try {
      const res = await fetch('/api/contact/deleteInquiry', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Delete failed');
      }
      toast.success('Inquiry deleted successfully');
      fetchInquiries(); // now this works correctly
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <InquiryTable
          type="inquiry"
          data={inquires}
          onDelete={handleDeleteInquiry}
        />
      )}
    </div>
  );
};
