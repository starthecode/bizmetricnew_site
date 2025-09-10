import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTable from '../Tables/UserTable';

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/user/getUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch pages');
        } else {
          setUsers(data.posts || []);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <UserTable type="user" data={users} />
      )}
    </div>
  );
}
