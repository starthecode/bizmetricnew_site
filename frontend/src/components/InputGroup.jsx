import React from 'react';

const InputGroup = ({ type, placeholder, name, onChange, value, disabled }) => {
  return (
    <div className="mb-6">
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full disabled:text-slate-400 rounded-md border border-stroke bg-transparent px-5 py-2 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};

export default InputGroup;
