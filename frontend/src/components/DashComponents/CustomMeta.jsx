import InputLabel from '../Form_Fields/InputLabel';

const fieldList = [
  { key: 'customMetaTitle', label: 'Custom Title' },
  { key: 'customMetaDesc', label: 'Custom Desc' },
  { key: 'customMetaLink', label: 'Custom Link' },
  { key: 'customMetaLinkText', label: 'Custom Link Text' },
  { key: 'customMetaLinkTwo', label: 'Custom Link Two' },
  { key: 'customMetaLinkTwoText', label: 'Custom Link Two Text' },
  { key: 'customMetaExtra', label: 'Custom Extra Field' },
  { key: 'customMetaExtra2', label: 'Custom Extra Field Two' },
];

export default function CustomMeta({ customMetaFields, setCustomMetaFields }) {
  const handleChange = (key) => (e) => {
    setCustomMetaFields((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="w-full px-4 border border-gray-300 rounded-md mt-5">
      <h2 className="text-xl font-bold mb-10 mt-4">Custom Meta</h2>
      {fieldList.map(({ key, label }) => (
        <InputLabel
          key={key}
          label={label}
          name={key}
          type="text"
          placeholder={`Enter ${label}`}
          value={customMetaFields?.[key] || ''}
          onChange={handleChange(key)}
        />
      ))}
    </div>
  );
}
