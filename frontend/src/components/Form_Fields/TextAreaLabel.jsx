import React from 'react';

const TextAreaLabel = ({
  label,
  name,
  placeholder = '',
  value,
  onChange,
  register,
  required = false,
  className = '',
  ...rest
}) => {
  const textareaProps = register
    ? {
        ...register(name, { required }),
      }
    : {
        value,
        onChange,
        required,
      };

  return (
    <div className={`flex flex-col gap-1 my-3 ${className}`}>
      <label htmlFor={name} className="font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]"
        {...textareaProps}
        {...rest}
      />
    </div>
  );
};

export default TextAreaLabel;
