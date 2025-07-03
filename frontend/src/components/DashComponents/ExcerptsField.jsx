import TextAreaLabel from '../Form_Fields/TextAreaLabel';

export default function ExcerptsField({ excerpts, setExcerpts }) {
  const handleExcerptsChange = (e) => {
    setExcerpts(e.target.value);
  };

  return (
    <div className="w-full px-4 border border-gray-300 rounded-md mt-5">
      <TextAreaLabel
        label="Excerpts"
        name="excerpts"
        placeholder="Add Excerpts"
        value={excerpts || ''}
        onChange={handleExcerptsChange}
      />
    </div>
  );
}
