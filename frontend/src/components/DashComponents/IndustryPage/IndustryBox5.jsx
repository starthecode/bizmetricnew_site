import InputLabel from '../../Form_Fields/InputLabel';

const fieldList = [
  { key: 'textInput1', label: 'Text Box One' },
  { key: 'textInput2', label: 'Text Box Two' },
  { key: 'textInput3', label: 'Text Box Three' },
];

export default function IndustryBox5({
  industryBox5Fields,
  setIndustryBox5Fields,
}) {
  const handleChange = (key, index) => (e) => {
    const newFields = [...industryBox5Fields];
    newFields[index] = {
      ...newFields[index],
      [key]: e.target.value,
    };
    setIndustryBox5Fields(newFields);
  };

  return (
    <div className="w-full space-y-4">
      {industryBox5Fields.map((field, index) => (
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
