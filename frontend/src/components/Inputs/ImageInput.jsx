import { BiPencil } from 'react-icons/bi';
import { useCallback, useState } from 'react';
import MediaLibraryModal from '../extras/MediaLibraryModal';

const ImageInput = ({ index, watchAll, setValue, type, title }) => {
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

  const [showMediaModal, setShowMediaModal] = useState(false);

  const handleSelectImage = (url) => {
    setValue(`${type}.${index}.${title}`, url); // This sends URL to parent
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(`${type}.${index}.${title}`, e); // This sends event to parent
    }
  };

  const imageUrl = watchAll?.[type]?.[index]?.[title];

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
    <div className="relative w-24 flex flex-col items-center gap-2">
      {imageUrl ? (
        <img
          src={typeof imageUrl === 'string' ? imageUrl : ''}
          alt="preview"
          className="w-18 h-18 object-cover rounded"
        />
      ) : (
        <div className="w-18 h-18 bg-gray-200 flex items-center justify-center rounded">
          No Image
        </div>
      )}

      <div className="flex gap-2">
        <label className="text-xs text-blue-600 cursor-pointer">
          Upload
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          type="button"
          onClick={() => setShowMediaModal(true)}
          className="text-xs text-gray-700 underline"
        >
          Choose
        </button>
      </div>

      <MediaLibraryModal
        isOpen={showMediaModal}
        onSelect={handleSelectImage}
        onClose={() => setShowMediaModal(false)}
        mediaState={mediaState}
        setMediaState={setMediaState}
        loadMedia={loadMedia}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ImageInput;
