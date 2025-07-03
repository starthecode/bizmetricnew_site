import React from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

export default function DropdownButton({ isCollapsed, toggleAction, index }) {
  return (
    <button
      type="button"
      className="text-blue-600 text-sm underline"
      onClick={() => toggleAction(index)}
    >
      {isCollapsed ? (
        <IoIosArrowDropdownCircle color="#f2692a" size={25} />
      ) : (
        <IoIosArrowDropdownCircle
          color="#f2692a"
          className="transform rotate-[-90deg]"
          size={25}
        />
      )}
    </button>
  );
}
