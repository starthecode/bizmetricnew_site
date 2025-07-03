import React from 'react';

export default function FormInput({
  placeholder,
  register,
  name,
  className = '',
}) {
  return (
    <>
      <input
        placeholder={placeholder}
        {...register(name)}
        className={`border px-2 py-1 rounded ${className}`}
      />
    </>
  );
}
