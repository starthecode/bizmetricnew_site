import { useState, useEffect } from 'react';
import ImageInput from '../Inputs/ImageInput';

const PostMetaFields = ({ setMetaData, initialMetaData }) => {
  // Initialize state with proper fallbacks
  const [categories, setCategories] = useState(
    initialMetaData?.categories || []
  );
  const [tags, setTags] = useState(initialMetaData?.tags || []);
  const [featuredImage, setFeaturedImage] = useState(
    initialMetaData?.featuredImage || ''
  );

  // Sync local state when initialMetaData changes
  useEffect(() => {
    if (
      JSON.stringify(initialMetaData?.categories || []) !==
        JSON.stringify(categories) ||
      JSON.stringify(initialMetaData?.tags || []) !== JSON.stringify(tags) ||
      (initialMetaData?.featuredImage || '') !== featuredImage
    ) {
      setCategories(initialMetaData?.categories || []);
      setTags(initialMetaData?.tags || []);
      setFeaturedImage(initialMetaData?.featuredImage || '');
    }
  }, [initialMetaData]);

  // Update parent whenever local state changes
  useEffect(() => {
    setMetaData({ categories, tags, featuredImage });
  }, [categories, tags, featuredImage, setMetaData]);

  const handleCategoryKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value && !categories.includes(value)) {
        setCategories([...categories, value]);
        event.target.value = '';
      }
    }
  };

  const handleTagKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = event.target.value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        event.target.value = '';
      }
    }
  };

  const removeCategory = (category) => {
    setCategories((prev) => prev.filter((item) => item !== category));
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  };

  const handleFeaturedImageChange = (eventOrUrl) => {
    if (eventOrUrl?.target?.files) {
      const file = eventOrUrl.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFeaturedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    } else if (typeof eventOrUrl === 'string') {
      setFeaturedImage(eventOrUrl);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-8 mt-10">
      {/* Categories */}
      <div className="w-full max-w-sm p-4 border rounded shadow-sm bg-white">
        <label className="block text-sm font-semibold text-gray-700">
          Categories
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Type category and press Enter"
          onKeyDown={handleCategoryKeyDown}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {category}
              <button
                type="button"
                onClick={() => removeCategory(category)}
                className="ml-2 text-red-500"
              >
                ✖
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="w-full max-w-sm p-4 border rounded shadow-sm bg-white">
        <label className="block text-sm font-semibold text-gray-700">
          Tags
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Type tag and press Enter"
          onKeyDown={handleTagKeyDown}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-2 text-red-500"
              >
                ✖
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Image using ImageInput */}
      <div className="w-full max-w-sm p-4 border rounded shadow-sm bg-white">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Featured Image
        </label>
        {featuredImage && (
          <div className="mb-2">
            <img
              src={`http://localhost:3000${featuredImage}`}
              alt="Featured"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}
        <ImageInput
          index={0}
          watchAll={{ featuredImage }}
          setValue={(field, val) => handleFeaturedImageChange(val)}
          type="featured"
          title="image"
        />
      </div>
    </div>
  );
};

export default PostMetaFields;
