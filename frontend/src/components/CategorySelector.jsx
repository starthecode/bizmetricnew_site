// components/CategorySelector.jsx
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CategorySelector = ({ type, pageType, selected, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState('');

  useEffect(() => {
    fetch(`/api/category?type=${type}`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, [type]);

  const handleAdd = () => {
    if (!newCat.trim()) return;
    fetch('/api/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCat.trim(), type, pageType }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.error); // show duplicate warning
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setCategories([...categories, data]);
      })
      .catch(console.error);
    setNewCat('');
  };

  return (
    <div className="mt-5 border border-woodsmoke-300 px-2">
      <h3 className="my-2">
        {type.charAt(0).toUpperCase() + type.slice(1)} Category
      </h3>
      <div
        style={{
          border: '1px solid #ccc',
          height: 180,
          overflowY: 'auto',
          padding: 16,
          marginBottom: 8,
        }}
      >
        {categories.map((cat) => (
          <div key={cat._id}>
            <input
              type="checkbox"
              checked={selected.includes(cat.name)}
              onChange={() => {
                if (selected.includes(cat.name))
                  onChange(selected.filter((s) => s !== cat.name));
                else onChange([...selected, cat.name]);
              }}
            />{' '}
            {cat.name}
          </div>
        ))}
      </div>
      <div className='mb-2 flex justify-between'>
        <input
        className='border-b border-woodsmoke-300 outline-none'
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder="Add New Category"
        />
        <button className='btn-secondary' type="button" onClick={handleAdd}>
          Add New
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
