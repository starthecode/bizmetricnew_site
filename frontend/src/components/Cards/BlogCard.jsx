import React from 'react';
import { formatDate } from '../../utils/utils';
import { Link } from 'react-router-dom';

const BlogCard = ({ item, type }) => {
  console.log('item', item);

  const { title, date, image, slug } = item;
  const categories = item?.category || [];

  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white">
      <img className="w-full h-40 object-cover" src={image} alt={title} />
      <div className="px-2 py-3 text-left">
        <div className="flex flex-wrap gap-4 text-sm mb-2 items-center">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="bg-flamingo-100 text-xs text-flamingo-500 font-semibold px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
          <span className="text-gray-500 text-xs">{formatDate(date)}</span>
        </div>
        <Link to={`${slug}`}>
          <h2 className="text-sm font-semibold text-woodsmoke-700">{title}</h2>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
