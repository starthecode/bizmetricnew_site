import { Link } from 'react-router-dom';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { useState, useEffect } from 'react';

export const SearchBar = ({
  type,
  onSearch,
  results = [],
  dropdown1Label = 'Industry',
  dropdown1Options = [],
  dropdown1Value,
  setDropdown1Value,
  dropdown2Label = 'Technology',
  dropdown2Options = [],
  dropdown2Value,
  setDropdown2Value,
}) => {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (onSearch) {
      onSearch({
        keyword,
        dropdown1: dropdown1Value,
        dropdown2: dropdown2Value,
      });
    }
  }, [keyword, dropdown1Value, dropdown2Value]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      keyword,
      dropdown1: dropdown1Value,
      dropdown2: dropdown2Value,
    });
  };

  const isDark = type === 'dark';

  const baseStyles = {
    container: `mx-auto w-screen h-12 max-w-screen-md relative z-10 flex justify-between rounded-xl px-2 py-1 sm:flex-row sm:items-center sm:p-0
      ${
        isDark
          ? 'bg-zinc-900 ring-1 ring-white/20'
          : 'bg-white ring-1 ring-gray-300'
      }`,
    select: `bg-transparent px-3 py-2 outline-none appearance-none text-sm
      ${isDark ? 'text-white' : 'text-woodsmoke-700 font-semibold'}`,
    input: `ml-2 w-full bg-transparent text-sm placeholder:text-gray-400 rounded-md py-3 pl-4 outline-none border-0
      ${isDark ? 'text-white' : 'text-woodsmoke-700 font-semibold'}`,
  };

  return (
    <>
      <form onSubmit={handleSearch} className={baseStyles.container}>
        <div className="flex gap-2 w-full">
          <select
            className={baseStyles.select}
            value={dropdown1Value}
            onChange={(e) => setDropdown1Value(e.target.value)}
          >
            <option value="">{dropdown1Label}</option>
            {dropdown1Options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <select
            className={baseStyles.select}
            value={dropdown2Value}
            onChange={(e) => setDropdown2Value(e.target.value)}
          >
            <option value="">{dropdown2Label}</option>
            {dropdown2Options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <input
            className={baseStyles.input}
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Type something..."
          />
        </div>
        <PrimaryButton type="submit" title="Search" />
      </form>

      <div className="grid lg:grid-cols-3 gap-6 aos-init">
        {results.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 mt-4">
            No results found.
          </div>
        ) : (
          results.map((item) => (
            <div key={item.id} className="your-card-style">
              <img src={item.image} alt={item.title} />
              <h1>{item.title}</h1>
              <Link to={`/case_studies/${item.slug}`}>Read more</Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};
