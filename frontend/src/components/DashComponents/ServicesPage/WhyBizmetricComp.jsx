import InputLabel from '../../Form_Fields/InputLabel';

const fieldList = [
  { key: 'whyboxDesc', label: 'Description' },
  { key: 'whyboxImage', label: 'Image Link' },
];

export default function WhyBizmetricComp({ whyboxFields, setWhyBoxFields }) {
  const handleChange = (key, index) => (e) => {
    const newFields = [...whyboxFields];
    newFields[index] = {
      ...newFields[index],
      [key]: e.target.value,
    };
    setWhyBoxFields(newFields);
  };

  return (
    <div className="w-full space-y-4">
      {whyboxFields.map((field, index) => (
        <div key={index}>
          {fieldList.map(({ key, label }) => (
            <InputLabel
              key={key}
              label={label}
              name={`${key}-${index}`}
              type="text"
              placeholder={`Enter ${label}`}
              value={field[key]}
              onChange={handleChange(key, index)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
