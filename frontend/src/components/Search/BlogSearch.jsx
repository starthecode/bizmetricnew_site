import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const BlogSearch = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', query);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      autoComplete="off"
      className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 w-full max-w-xl"
    >
      <input
        type="text"
        name="blogsearch"
        id="blogsearch"
        className="flex-grow focus:outline-none text-sm placeholder-gray-400"
        placeholder="What do you want to search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        id="searchBlogSubmit"
        name="searchQuerySubmit"
        className="text-gray-600 hover:text-black"
      >
        <FiSearch size={20} />
      </button>
    </form>
  );
};

export default BlogSearch;
