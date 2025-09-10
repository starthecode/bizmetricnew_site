export const handlePageDelete = async ({ type, postid, navigate, toast }) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this page? This action cannot be undone.'
  );
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/action/delete/${type}/${postid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    if (data.success) {
      toast.success(`${type} Deleted`);
      navigate(
        `/dashboard/${
          type == 'post' ? 'posts' : type === 'casestudy' ? 'casestudies' : type
        }`
      );
      window.location.reload();
    }
  } catch (error) {
    toast.error(error.message);
  }
};
