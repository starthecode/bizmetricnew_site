import React from 'react';
import InputLabel from '../../Form_Fields/InputLabel';

export default function BlogComp({ blogTitle, setBlogTitle }) {
  const handleChange = (key) => (e) => {
    setBlogTitle((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <div className="w-full space-y-4">
      <InputLabel
        label="Blog Section"
        name="blogTitle"
        type="text"
        placeholder="enter blog title"
        value={blogTitle?.blogTitle || ''}
        onChange={handleChange('blogTitle')}
      />
    </div>
  );
}
