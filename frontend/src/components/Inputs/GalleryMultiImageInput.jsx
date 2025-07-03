import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function GalleryMultiImageInput({
  name,
  index,
  register,
  setValue,
  getValues,
}) {
  const fieldName = `galleryboxes.items.${index}.${name}`;
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [fileLoading, setFileLoading] = useState(false);

  useEffect(() => {
    const existing = getValues(fieldName);
    if (existing?.length) setPreviews(existing);
  }, [fieldName, getValues]);

  const isValidImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 200 * 1024; // 200KB
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        `${file.name} is not a valid format. Only JPG, PNG, or WEBP allowed.`
      );
      return false;
    }
    if (file.size > maxSize) {
      toast.error(`${file.name} is too large. Max size is 200KB.`);
      return false;
    }
    return true;
  };

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const uploaded = [];

    setFileLoading(true);

    for (const file of files) {
      if (!isValidImage(file)) continue;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/file/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (data?.fileUrl) {
          uploaded.push({
            imageLink: data.fileUrl,
            imageName: file.name,
          });
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
      }
    }

    const updated = [...(getValues(fieldName) || []), ...uploaded];
    setPreviews(updated);
    setValue(fieldName, updated);
    setFileLoading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (indexToRemove) => {
    const updated = previews.filter((_, i) => i !== indexToRemove);
    setPreviews(updated);
    setValue(fieldName, updated);
  };

  return (
    <div className="col-span-1">
      {/* Upload Button */}
      <div className="flex gap-5 items-center">
        <label
          htmlFor={`file-upload-${index}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded cursor-pointer hover:bg-blue-700"
        >
          Upload Gallery Images
        </label>
        <input
          id={`file-upload-${index}`}
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          onChange={handleChange}
          className="hidden"
        />
        {previews.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            {previews.length} image{previews.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {fileLoading ? (
        <p className="text-sm text-gray-500 mt-2">Uploading images...</p>
      ) : previews.length > 0 ? (
        <div className="mt-5 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
          {previews.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img.imageLink}
                alt={img.imageName || `preview-${i}`}
                className="w-14 h-14 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
