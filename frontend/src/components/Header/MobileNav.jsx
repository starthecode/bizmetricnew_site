import { Link } from 'react-router';
import React from 'react';
import { BiChevronDownCircle } from 'react-icons/bi';

export const MobileNav = ({ menuList }) => {
  const [MDropdown, setMDropdown] = React.useState(false);

  const dropdownHandler = (params) => {
    setMDropdown((prevDropdown) => (prevDropdown !== params ? params : false));
  };
  return (
    <div>
      <nav className="w-full block lg:hidden">
        <ul className="flex flex-col lg:flex-row mt-10">
          {menuList?.map((item, index) => (
            <li className="js-nav-dropdown group relative" key={index}>
              <button
                onClick={() => dropdownHandler(item.key)}
                className="hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 dark:text-white lg:px-5 w-full"
              >
                <span className="text-base sm:text-sm md:text-md 2xl:text-lg dark:text-accent">
                  {item.title}
                </span>
                {item?.children.length > 0 && (
                  <BiChevronDownCircle className="lg:hidden h-4 w-4 dark:fill-white" />
                )}
              </button>
              {item?.children.length > 0 && (
                <ul
                  className={` left-0 top-[85%] z-10 min-w-[200px] gap-x-4 whitespace-nowrap rounded-xl transition-all will-change-transform group-hover:visible group-hover:opacity-100 lg:invisible lg:absolute lg:grid lg:translate-y-4 lg:py-4 lg:px-2 lg:opacity-0 lg:shadow-2xl lg:group-hover:translate-y-2 relative ${
                    MDropdown == item.key ? 'block' : 'hidden'
                  }`}
                >
                  {item?.children.map((child, index) => (
                    <li key={index}>
                      <Link
                        className="hover:text-accent focus:text-accent flex items-center rounded-xl px-5 py-2 transition-colors justify-between"
                        href="/"
                      >
                        <span className="text-sm dark:text-white">
                          {child.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
