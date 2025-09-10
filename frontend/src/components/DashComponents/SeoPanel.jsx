import React from 'react';
import InputLabel from '../Form_Fields/InputLabel';

const fieldList = [
  { key: 'focusKeyphrase', label: 'Focus keyphrase' },
  { key: 'seoTitle', label: 'Seo Title' },
  { key: 'seoDescription', label: 'Seo Description' },
];

export default function SeoPanel({ seoFields, setSeoFields, pageName }) {
  const handleChange = (key) => (e) => {
    setSeoFields((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="w-full px-4 border border-gray-300 rounded-md mt-5">
      <h2 className="capitalize text-xl font-bold mb-10 mt-4">{pageName} Seo</h2>
      {fieldList.map(({ key, label }) => (
        <InputLabel
          key={key}
          label={label}
          name={key}
          type="text"
          placeholder={`Enter ${label}`}
          value={seoFields?.[key] || ''}
          onChange={handleChange(key)}
        />
      ))}
    </div>
  );
}
