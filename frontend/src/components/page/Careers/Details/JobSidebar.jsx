import React from 'react';

export const JobSidebar = () => {
  return (
    <section>
      <div className="shadow dark:shadow-gray-700 rounded-md !text-white bg-flamingo-500 dark:bg-junglegreen-700 sticky top-20">
        <div className="p-6">
          <h5 className="text-lg font-semibold">Job Information</h5>
        </div>
        <div className="px-4 py-4 relative group inner-content border-t border-onyx-800/20 shadow-lg bg-white dark:bg-gradient-to-t from-onyx-950 to-woodsmoke-950">
          <ul className="list-none">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-user-check size-5"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>
              </svg>

              <div className="ms-4">
                <p className="font-medium text-woodsmoke-700">Employee Type:</p>
                <span className="text-woodsmoke-400 font-medium text-sm">
                  Full Time
                </span>
              </div>
            </li>

            <li className="flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-map-pin size-5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>

              <div className="ms-4">
                <p className="font-medium text-woodsmoke-700">Location:</p>
                <span className="text-woodsmoke-400 font-medium text-sm">
                  Beijing, China
                </span>
              </div>
            </li>

            <li className="flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-monitor size-5"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>

              <div className="ms-4">
                <p className="font-medium text-woodsmoke-700">Job Type:</p>
                <span className="text-woodsmoke-400 font-medium text-sm">
                  Back-end Developer
                </span>
              </div>
            </li>

            <li className="flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-briefcase size-5"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>

              <div className="ms-4">
                <p className="font-medium text-woodsmoke-700">Experience:</p>
                <span className="text-woodsmoke-400 font-medium text-sm">
                  2+ years
                </span>
              </div>
            </li>

            <li className="flex items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-clock size-5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>

              <div className="ms-4">
                <p className="font-medium text-woodsmoke-700">Date posted:</p>
                <span className="text-woodsmoke-400 font-medium text-sm">
                  28th Feb, 2023
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="shadow dark:shadow-gray-700 rounded-md !text-white bg-flamingo-500 dark:bg-junglegreen-700 sticky top-20 mt-10">
        <div className="p-6">
          <h5 className="text-lg font-semibold">About Bizmetric</h5>
        </div>
        <div className="px-4 py-4 relative group inner-content border border-onyx-800/20 shadow-lg bg-white dark:bg-gradient-to-t from-onyx-950 to-woodsmoke-950">
          <div>
            <p className="text-sm mb-4 text-woodsmoke-700">
              Bizmetric, a Microsoft Solution Partner & Oracle Gold Partner & ,
              was founded in 2011 in Houston, Texas, US and in 2015 in Pune,
              India. It is a fast-paced organization that is marking an
              exponential growth every quarter. We have also surpassed the
              geographical boundaries and made our presence in the US, UK,
              Middle-East & Indian markets. Bizmetric is a pure-play
              technologically driven company helping customers in the field of
              Data Science, Advanced Analytics, Cloud and Edge Computing.
            </p>
            <p className="text-sm text-woodsmoke-700">
              We are Microsoft, Oracle, Snowflake, Confluent, Informatica
              partners as well. Our rich & varied experience in Business
              Intelligence coupled with a market-disrupting solution like Big
              Data & Data Science is widening our services and solutions. Our
              incredibly expert professionals in Artificial Intelligence &
              Machine Learning have exhibited their intellect in high-profile
              projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
