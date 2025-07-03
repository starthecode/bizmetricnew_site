import React from 'react';
import { BiDownArrow, BiLogOut } from 'react-icons/bi';
import { PrimaryButton } from '../Buttons/PrimaryButton';

import { useSelector } from 'react-redux';

export const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [active, setActive] = React.useState(false);

  const handleDropdown = () => {
    setActive((prevActive) => !prevActive);
  };

  const username = currentUser?.email.split('@')[0];
  if (!username) {
    return <PrimaryButton title="Contact Us" link="/contact-us" />;
  }

  const firstLetter = username.charAt(0).toUpperCase();
  const lastLetter = username.charAt(username.length - 1).toUpperCase();

  const emailName = `${firstLetter}${lastLetter}`;

  return (
    <>
      {currentUser ? (
        <div className="relative block w-full">
          <button
            onClick={handleDropdown}
            type="button"
            className="relative w-[140px] z-10 py-1 ps-1 pe-3 flex items-center gap-x-2 text-sm font-medium rounded-full text-gray-800 shadow-sm focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            {!currentUser?.profilePicture ? (
              <span className="bg-white p-1 w-8 h-auto rounded-full">
                {emailName}
              </span>
            ) : (
              <img
                width={20}
                height={20}
                className="w-8 h-auto rounded-full"
                src={currentUser?.profilePicture}
                alt="Avatar"
              />
            )}

            <span className="font-medium w-full text-junglegreen-500">
              {currentUser?.userName}
            </span>
            <BiDownArrow className="fill-junglegreen-800" />
          </button>

          <div
            className={`${
              active ? 'flex flex-col opacity-100' : 'hidden opacity-0'
            } absolute right-0 w-[120px] transition-opacity duration min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="hs-dropdown-custom-trigger"
          >
            <ul>
              <li className="border-b">
                <p className="p-2 flex flex-col">
                  <span className="text-sm">Signed in as</span>
                  <span className="text-sm">{currentUser?.email}</span>
                </p>
              </li>
              {/* <li className="mt-2">
                {session?.user?.role === 'administrator' ? (
                  <Link
                    className="flex gap-1 items-center py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    href="/dashboard"
                  >
                    <MdDashboard /> Dashboard
                  </Link>
                ) : (
                  <Link
                    className="flex gap-1 items-center py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    href="/write"
                  >
                    <MdDashboard /> Write Article
                  </Link>
                )}
              </li> */}

              <li>
                <button
                  className="flex w-full gap-1 items-center py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  onClick={() => null}
                >
                  <BiLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
