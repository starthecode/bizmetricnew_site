import { Link } from 'react-router';
import React from 'react';
import { IoMdArrowRoundForward } from 'react-icons/io';

export const SecondaryButton = ({ title, link, classes }) => {
  return (
    <Link
      href={link}
      className={`relative ${
        classes ? classes : 'text-flamingo-500'
      } inline-flex items-center gap-1.5 rounded-full ease-in duration-300 hover:shadow-button`}
    >
      {title}
      <IoMdArrowRoundForward
        className="group-hover:-rotate-45 group-hover:scale-150 transition-all duration-400"
        size={20}
      />
    </Link>
  );
};
