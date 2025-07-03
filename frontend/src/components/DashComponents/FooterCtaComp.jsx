const FooterCtaComp = ({ ctaField, setCtaField }) => {
  const handleChange = (e) => {
    setCtaField(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-4">
      <label
        htmlFor="true-false"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Show Footer CTA
      </label>
      <select
        id="true-false"
        value={ctaField}
        onChange={handleChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
      >
        <option value="">-- Select --</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    </div>
  );
};

export default FooterCtaComp;
