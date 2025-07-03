import React, { useState, useEffect, useCallback } from 'react';
import MediaLibraryModal from '../../../../components/extras/MediaLibraryModal';

const MediaLibraryManager = ({ isOpen, onSelect, onClose }) => {
  const [mediaState, setMediaState] = useState({
    list: [],
    page: 1,
    hasMore: true,
    isLoading: false,
  });

  const loadMedia = useCallback(async (pageNum) => {
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

  const handleDelete = useCallback(async (blobName) => {
    try {
      const response = await fetch(
        `/api/file/delete?name=${encodeURIComponent(blobName)}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setMediaState((prev) => ({
          ...prev,
          list: prev.list.filter((item) => item.name !== blobName),
        }));
      } else {
        console.error('Failed to delete blob');
      }
    } catch (error) {
      console.error('Error deleting blob:', error);
    }
  }, []);

  return (
    <MediaLibraryModal
      isOpen={true}
      onSelect={onSelect}
      onClose={onClose}
      mediaState={mediaState}
      setMediaState={setMediaState}
      loadMedia={loadMedia}
      handleDelete={handleDelete}
    />
  );
};

export default MediaLibraryManager;
