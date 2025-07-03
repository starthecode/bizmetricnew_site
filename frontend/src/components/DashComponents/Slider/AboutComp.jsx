import React from 'react';
import InputLabel from '../../Form_Fields/InputLabel';

const fieldList = [
  { key: 'smallTitle', label: 'Small Title' },
  { key: 'aboutTitle', label: 'About Title' },
  { key: 'embedField', label: 'Embed Field' },
  { key: 'descField', label: 'Description' },
  { key: 'buttonText', label: 'Button Text' },
  { key: 'buttonUrl', label: 'Button URL' },
  { key: 'moreField', label: 'More Field' },
];

export default function AboutComp({ aboutFields, setAboutFields }) {
  const handleChange = (key) => (e) => {
    setAboutFields((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="w-full space-y-4">
      {fieldList.map(({ key, label }) => (
        <InputLabel
          key={key}
          label={label}
          name={key}
          type="text"
          placeholder={`Enter ${label}`}
          value={aboutFields?.[key]}
          onChange={handleChange(key)}
        />
      ))}
    </div>
  );
}
