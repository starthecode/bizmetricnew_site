import React from 'react';

const ParentPageDropdown = ({ parentpageField, setParentPageField }) => {
  const [pages, setPages] = React.useState([]);
  const [selectedTitle, setSelectedTitle] = React.useState('');

  // Fetch the list of pages
  React.useEffect(() => {
    const fetchParentPage = async () => {
      try {
        const res = await fetch(`/api/page/getPages?_fields=title,slug`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
          console.log('Something went wrong');
          return;
        }
        setPages(data.pages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchParentPage();
  }, []);

  React.useEffect(() => {
    if (parentpageField) {
      setSelectedTitle(parentpageField);
    }
  }, [parentpageField]);

  const handleChange = (e) => {
    const title = e.target.value;
    setSelectedTitle(title);
    setParentPageField(title); // store just the title
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-4">
      <label
        htmlFor="parent-page"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Parent Page
      </label>
      <select
        id="parent-page"
        value={selectedTitle}
        onChange={handleChange}
        className="block capitalize w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
      >
        <option value="">-- Select --</option>
        {pages.map((page) => (
          <option key={page._id} value={page.slug.toLowerCase()}>
            {page.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParentPageDropdown;
