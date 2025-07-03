import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router';
import { useCallback, useRef, useState } from 'react';

export const Search = ({ active, width }) => {
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [results, setResults] = useState([]);

  const apiDomain = 'https://www.google.com';

  const searchEndPoint = useCallback(
    (query) => `${apiDomain}/wp-json/wp/v2/posts?search=${query}`,
    [apiDomain]
  );

  const onChange = useCallback(
    (event) => {
      const query = event.target.value;
      setQuery(query);
      if (query.length) {
        fetch(searchEndPoint(query)).then((res) =>
          res.json().then((data) => setResults(data))
        );
      } else {
        setResults([]);
      }
    },
    [searchEndPoint]
  );

  const onFocus = useCallback(() => {
    setSearchActive(true);
    window.addEventListener('click', onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = useCallback((event) => {
    //@ts-ignore
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchActive(false);
      window.removeEventListener('click', onClick);
    }
  }, []);

  return (
    <>
      <div className="flex w-full h-full items-center">
        <form
          ref={searchRef}
          action="search"
          className={`${
            width < 1024 && active && 'mt-10 mb-8 w-full'
          } relative flex w-full bg-transparent rounded-sm`}
        >
          <input
            id="search"
            autoComplete="off"
            placeholder="Search..."
            onChange={onChange}
            onFocus={onFocus}
            value={query}
            type="search"
            className="font-bold placeholder-flamingo-500 focus:outline-none focus-visible:outline-none w-full rounded-xl p-2 pl-10 border border-transparent
text-ebony-700 dark:border-transparent bg-transparent dark:text-white dark:placeholder-junglegreen-500"
          />
          <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-2xl">
            <FaMagnifyingGlass className="h-4 w-4 stroke-flamingo-600 fill-flamingo-500 dark:stroke-junglegreen-500 dark:fill-junglegreen-500" />
          </span>
        </form>
        {searchActive && results.length > 0 && (
          <ul className="bg-white w-full absolute shadow-2xl z-10 top-11 transition ease-in-out will-change-transform duration-100 delay-100 translate-y-4">
            {results.map((item) => (
              <li className="text-black px-4 py-2" key={item.id}>
                <Link target="_blank" href={`/blogs/${item.slug}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
