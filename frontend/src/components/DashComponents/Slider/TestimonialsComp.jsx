import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputLabel from '../../Form_Fields/InputLabel';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';

const TestimonialsComp = forwardRef(
  ({ testimonialsData, testimonialsTitle, setTestimonialsTitle }, ref) => {
    const { register, control, watch, setValue, getValues } = useForm({
      defaultValues: {
        testimonials: testimonialsData,
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'testimonials',
    });

    const watchAll = watch();

    const [collapsedTestimonials, setCollapsedTestimonials] = useState([]);

    const toggleTestimonials = (index) => {
      setCollapsedTestimonials((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    };

    useImperativeHandle(ref, () => ({
      getTestimonialsData: () => getValues('testimonials'),
    }));

    React.useEffect(() => {
      setValue('testimonials', testimonialsData);
    }, [testimonialsData, setValue]);

    const handleImageUpload = async (e, index) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/file/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const err = await res.text();
          alert(`Upload failed: ${err}`);
          return;
        }

        const data = await res.json();
        const uploadedUrl = data.filePath;

        setValue(`testimonials.${index}.testimonialsImage`, uploadedUrl);
      } catch (err) {
        alert('Upload error: ' + err.message);
      }
    };

    const handleTestimonialsTitleChange = (e) => {
      setTestimonialsTitle(e.target.value);
    };

    return (
      <>
        <h2 className="text-xl font-bold mb-4">Testimonials</h2>

        <InputLabel
          label="Testimonials Title"
          name="testimonialsTitle"
          type="text"
          placeholder="Enter Text"
          value={testimonialsTitle}
          onChange={handleTestimonialsTitleChange}
        />

        {fields.map((item, index) => {
          const isCollapsed = collapsedTestimonials.includes(index);

          return (
            <div
              key={item.id}
              className="border rounded shadow-sm bg-gray-50 mb-4"
            >
              <div className="flex justify-between items-center p-2 bg-gray-200 rounded-t">
                <span className="font-medium">Testimonials {index + 1}</span>
                <DropdownButton
                  isCollapsed={isCollapsed}
                  toggleAction={toggleTestimonials}
                  index={index}
                />
              </div>

              {!isCollapsed && (
                <div className="w-full">
                  <div className="grid grid-cols-4 gap-2 p-4">
                    <div>
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, index)}
                      />
                      {watchAll?.testimonials?.[index]?.testimonialsImage && (
                        <img
                          src={`/${watchAll.testimonials[index].testimonialsImage}`}
                          alt="preview"
                          className="w-20 mt-2"
                        />
                      )}
                    </div>

                    <input
                      placeholder="Name"
                      {...register(`testimonials.${index}.testimonialsName`)}
                    />

                    <input
                      placeholder="Subname"
                      {...register(`testimonials.${index}.testimonialsSubName`)}
                    />
                    <input
                      placeholder="Sub Text"
                      {...register(`testimonials.${index}.testimonialsSubText`)}
                    />
                  </div>
                  <RemoveButton removeAction={remove} index={index} />
                </div>
              )}
            </div>
          );
        })}

        <AddButton
          append={append}
          defaultValues={{
            testimonialsImage: '',
            testimonialsName: '',
            testimonialsSubName: '',
            testimonialsSubText: '',
          }}
        />
      </>
    );
  }
);

export default TestimonialsComp;
