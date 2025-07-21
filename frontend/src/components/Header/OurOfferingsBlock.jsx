import { useEffect, useState } from 'react';
import { fetchApi } from '../../utils/api';
import { Link } from 'react-router-dom';

export default function OurOfferingsBlock() {
  const [offerings, setOfferings] = useState([]);

  useEffect(() => {
    fetchApi({ url: '/api/solutions/getSolutions' })
      .then((data) => setOfferings(data?.posts))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-2 cursor-pointer min-w-max h-fit overflow-auto p-4">
      <div class="lg:flex justify-between w-[650px]">
        <ul class="text-sm text-gray-700 grid grid-cols-2">
          {offerings &&
            offerings?.map((item, index) => (
              <li key={index}>
                <Link
                  to={`/solutions/${item?.slug}`}
                  class="px-3 my-2 py-2 transition-all duration-500 hover:bg-gray-50 hover:rounded-xl flex items-center"
                >
                  <div class="w-12 h-12 flex">
                    <img
                      className="object-cover rounded-lg"
                      src={item?.image}
                      alt={item?.title}
                    />
                  </div>
                  <div class="ml-4 w-4/5">
                    <h5 class="text-gray-900 text-xs mb-1.5 font-semibold">
                      {item?.title.length > 20
                        ? item.title.substring(0, 50) + '...'
                        : item.title}
                    </h5>
                    <p class="text-xs font-medium text-gray-400">
                      {item?.excerpts.length > 20
                        ? item.excerpts.substring(0, 80) + '...'
                        : item.excerpts}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
