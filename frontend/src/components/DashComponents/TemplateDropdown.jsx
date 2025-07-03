const TemplateDropdown = ({ templateField, setTemplateField }) => {
  const handleChange = (e) => {
    setTemplateField(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-4">
      <label
        htmlFor="true-false"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Template
      </label>
      <select
        id="true-false"
        value={templateField}
        onChange={handleChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
      >
        <option value="default">Default</option>
        <option value="homepage">Homepage</option>
        <option value="services">Services</option>
        <option value="industries">Industries</option>
        <option value="aboutus">About Us</option>
        <option value="lifeatbiz">Life At Bizmetric</option>
        <option value="contactus">Contact Us</option>
      </select>
    </div>
  );
};

export default TemplateDropdown;
