import React from 'react';
import { Link } from 'react-router-dom';

export default function PostTags({ tagItems }) {
  return (
    <div className="py-10">
      <div className="flex items-center gap-2">
        <p>Tags:</p>
        <div className="flex flex-wrap items-center gap-1">
          {tagItems &&
            tagItems?.map((item, index) => (
              <Link
                key={index}
                className="badge-border"
                href="#"
              >
                {item}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
