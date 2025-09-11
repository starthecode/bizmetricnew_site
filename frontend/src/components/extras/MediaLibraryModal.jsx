import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const MediaLibraryModal = ({
  isOpen,
  onSelect,
  onClose,
  mediaState,
  setMediaState,
  loadMedia,
  handleDelete,
}) => {
  const [tab, setTab] = useState('library');
  const [selectedForDelete, setSelectedForDelete] = useState(null);

  useEffect(() => {
    if (isOpen && tab === 'library' && mediaState.list.length === 0) {
      loadMedia(1);
    }
  }, [isOpen, tab, mediaState.list.length, loadMedia]);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      const isNearBottom = scrollHeight - scrollTop <= clientHeight + 100;

      if (isNearBottom && !mediaState.isLoading && mediaState.hasMore) {
        const newPage = mediaState.page + 1;
        loadMedia(newPage);
      }
    },
    [mediaState.isLoading, mediaState.hasMore, mediaState.page, loadMedia]
  );

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.loading('Please Wait...');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/file/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      toast.error('File Uploaded Failed');
    }

    toast.dismiss();
    toast.success('File Uploaded Successfully');
    const data = await res.json();

    setMediaState((prev) => ({
      ...prev,
      list: [
        {
          name: file.name,
          url: data.fileUrl,
          lastModified: new Date().toISOString(),
        },
        ...prev.list,
      ],
    }));

    onSelect(data.fileUrl);
    onClose();
  };

  const confirmDelete = (blobName) => {
    setSelectedForDelete(blobName);
  };

  const cancelDelete = () => {
    setSelectedForDelete(null);
  };

  const executeDelete = () => {
    if (selectedForDelete) {
      handleDelete(selectedForDelete);
      setSelectedForDelete(null);
    }
  };

  console.log('mediaState', mediaState);

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[90%] max-w-2xl shadow-md">
        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={() => setTab('library')}
            className={`px-4 py-2 ${
              tab === 'library' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Media Library
          </button>
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-4 py-2 ${
              tab === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Upload
          </button>
          <button type="button" onClick={onClose} className="text-red-500">
            ✕
          </button>
        </div>

        {tab === 'upload' && (
          <div className="p-4 border border-dashed border-gray-300 rounded">
            <input
              type="file"
              onChange={handleUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        )}

        {tab === 'library' && (
          <>
            <div
              className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2"
              onScroll={handleScroll}
            >
              {mediaState.list.map((img) => (
                <div
                  key={`${img.name}-${img.lastModified}`}
                  className="relative group"
                >
                  <img
                    src={`${img.url}`}
                    className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() => {
                      onSelect(img.url);
                      onClose();
                    }}
                    alt={img.name}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.name}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(img.name);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                  <button
                    className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(img.url);
                    }}
                  >
                    Copy URL
                  </button>
                </div>
              ))}
              {mediaState.isLoading && (
                <div className="col-span-4 flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              )}
              {!mediaState.hasMore && mediaState.list.length > 0 && (
                <div className="col-span-4 text-center py-4 text-gray-500">
                  No more images to load
                </div>
              )}
            </div>

            {/* Delete confirmation modal */}
            {selectedForDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md">
                  <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
                  <p>Are you sure you want to delete this file?</p>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={cancelDelete}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={executeDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default MediaLibraryModal;
