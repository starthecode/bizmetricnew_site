import React from 'react';
import toast from 'react-hot-toast';
import PollsTable from '../../../../../components/Tables/PollsTable';

export default function ShowPolls() {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await fetch(`/api/poll/get-polls/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const result = await res.json();

        if (!res.ok) {
          toast.error(data.message || 'Failed to fetch page data');
          console.log('e1', data.message);
          return;
        }

        setData(result?.pollData);
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
        console.log('e2', error.message);
      }
    };

    fetchPolls();
  }, []);

  return <PollsTable data={data} />;
}
