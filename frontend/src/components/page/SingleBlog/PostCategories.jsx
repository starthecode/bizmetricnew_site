import { Link } from 'react-router-dom';

export default function PostCategories({ catItems }) {
  return (
    <div className="lg:w-4/5">
      <div className="flex gap-4">
        {catItems &&
          catItems?.map((item, index) => (
            <Link
              key={index}
              className="badge"
              href="#"
            >
              {item}
            </Link>
          ))}
      </div>
      <h1 className="lg:text-5xl/snug text-3xl/snug mt-3 text-ebony-900"></h1>
    </div>
  );
}
