import React from 'react';
import { BiPlus } from 'react-icons/bi';

export default function AddButton({ append, defaultValues }) {
  return (
    <div className="flex justify-end p-2">
      <button
        type="button"
        className="bg-junglegreen-600 text-white px-3 py-1 rounded flex items-center gap-1"
        onClick={() => append(defaultValues)}
      >
        Add Row <BiPlus size={20} />
      </button>
    </div>
  );
}
