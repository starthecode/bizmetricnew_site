import React from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import { RiArrowRightWideFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

type TBreadCrumbProps = {
  capitalizeLinks?: boolean;
};

export const Breadcrumbs = ({ capitalizeLinks }: TBreadCrumbProps) => {
  const paths = useLocation();
  const pathNames = paths.pathname.split('/').filter(Boolean);

  return (
    <section>
      <div className="relative z-10">
        <ul className="flex items-center text-xs lg:text-xs gap-3 capitalize">
          <li className="inline-flex items-center">
            <Link to="/" className="flex gap-1 text-woodsmoke-200">
              <HiOutlineHome />
              Home
            </Link>
          </li>

          {pathNames.length > 0 && (
            <span>
              <RiArrowRightWideFill className="fill-woodsmoke-500" />
            </span>
          )}

          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathNames.length - 1;

            const itemLink = capitalizeLinks
              ? link.charAt(0).toUpperCase() + link.slice(1)
              : link;

            const itemClasses = isLast
              ? 'font-semibold text-flamingo-500 text-sm'
              : 'text-flamingo-500/80 hover:underline';

            return (
              <React.Fragment key={index}>
                <li>
                  <Link className={itemClasses} to={href}>
                    {itemLink.replace(/-/g, ' ')}
                  </Link>
                </li>
                {!isLast && (
                  <span>
                    <RiArrowRightWideFill className="fill-woodsmoke-500" />
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
