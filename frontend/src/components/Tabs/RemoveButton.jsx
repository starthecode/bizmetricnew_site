import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { IoIosArrowDropdownCircle } from 'react-icons/io';

export default function RemoveButton({ removeAction, index }) {
  return (
    <div className="flex justify-end p-2">
      <button
        type="button"
        className="text-red-500 mt-2"
        onClick={() => removeAction(index)}
      >
        <BiTrash size={20} color="red" />
      </button>
    </div>
  );
}
