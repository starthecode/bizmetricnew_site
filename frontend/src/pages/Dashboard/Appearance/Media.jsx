import React from 'react';

import { MdCopyAll, MdOutlineDeleteForever } from 'react-icons/md';

const Media = ({ onSelect }) => {
  const [mediaList, setMediaList] = React.useState([]);
  const [tab, setTab] = React.useState('library'); // 'library' or 'upload'

  const [mediaState, setMediaState] = React.useState({
    list: [],
    page: 1,
    hasMore: true,
    isLoading: false,
  });

  const [loading, setLoading] = React.useState(false);

  const loadMedia = React.useCallback(async (pageNum) => {
    setMediaState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch(`/api/file/media?page=${pageNum}&limit=20`);
      const data = await res.json();

      setMediaState((prev) => ({
        list: pageNum === 1 ? data.data : [...prev.list, ...data.data],
        page: pageNum,
        hasMore: data.hasMore,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error loading media:', error);
      setMediaState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  React.useEffect(() => {
    if (tab === 'library') {
      fetchMedia();
    }
  }, [tab]);

  // const handleUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   const res = await fetch('/api/file/upload', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   const data = await res.json();
  //   onSelect(data.fileUrl); // or filePath based on what your server sends
  //
  // };

  //upload file

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/file/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('res', res);

      if (!res.ok) {
        throw new Error('Upload failed');
      }
      // const data = await res.json();
      // onSelect(data.fileUrl);
      setTab('library');
      fetchMedia();
    } catch (err) {
      console.error('Upload failed', err);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  //delete file
  const handleDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    await fetch(`/api/file/delete/${filename}`, {
      method: 'DELETE',
    });

    fetchMedia(); // refresh list
  };

  {
    loading && (
      <div className="absolute inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
        <div className="text-gray-800 font-semibold text-lg animate-pulse">
          Uploading...
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white p-4 rounded-lg w-full shadow-md mt-10">
      <div className="flex gap-10 mb-4">
        <button type="button" onClick={() => setTab('library')}>
          Media Library
        </button>
        <button type="button" onClick={() => setTab('upload')}>
          Upload
        </button>
      </div>

      {tab === 'upload' && <input type="file" onChange={handleUpload} />}

      {tab === 'library' && (
        <div className="grid grid-cols-4 gap-4 max-h-[500px] overflow-y-auto">
          {mediaList.map((img) => (
            <div key={img.name} className="relative group overflow-hidden">
              <img
                src={img.url}
                className="w-full h-40 object-cover rounded cursor-pointer hover:opacity-80"
                onClick={() => {
                  onSelect(img.url);
                }}
              />
              <button
                className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(img.name);
                }}
              >
                <MdOutlineDeleteForever />
              </button>

              <button
                className="absolute top-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(img.url);
                }}
              >
                <MdCopyAll />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;
