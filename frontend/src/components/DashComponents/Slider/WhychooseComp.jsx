import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputLabel from '../../Form_Fields/InputLabel';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import { whychooseInputFields } from '../../../utils/fields';
import FormInput from '../../Inputs/FormInput';
import ImageInput from '../../Inputs/ImageInput';

const WhychooseComp = forwardRef(
  ({ whychooseData, whychooseTitle, setWhychooseTitle }, ref) => {
    const { register, control, watch, setValue, getValues } = useForm({
      defaultValues: {
        whychoose: whychooseData,
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'whychoose',
    });

    const watchAll = watch();

    const [collapsedWhychoose, setCollapsedWhychoose] = useState([]);

    const toggleWhychoose = (index) => {
      setCollapsedWhychoose((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    };

    useImperativeHandle(ref, () => ({
      getWhychooseData: () => getValues('whychoose'),
    }));

    React.useEffect(() => {
      setValue('whychoose', whychooseData);
    }, [whychooseData, setValue]);

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

        setValue(`whychoose.${index}.whychooseImage`, uploadedUrl);
      } catch (err) {
        alert('Upload error: ' + err.message);
      }
    };

    const handleWhychooseTitleChange = (e) => {
      setWhychooseTitle(e.target.value);
    };

    return (
      <>
        <h2 className="text-xl font-bold mb-4">Whychoose</h2>

        <InputLabel
          label="Whychoose Title"
          name="whychooseTitle"
          type="text"
          placeholder="Enter Text"
          value={whychooseTitle}
          onChange={handleWhychooseTitleChange}
        />

        {fields.map((item, index) => {
          const isCollapsed = collapsedWhychoose.includes(index);

          return (
            <div
              key={item.id}
              className="border rounded shadow-sm bg-gray-50 mb-4"
            >
              <div className="flex justify-between items-center p-2 bg-gray-200 rounded-t">
                <span className="font-medium">Whychoose {index + 1}</span>
                <DropdownButton
                  isCollapsed={isCollapsed}
                  toggleAction={toggleWhychoose}
                  index={index}
                />
              </div>

              {!isCollapsed && (
                <div className="w-full">
                  <div className="grid grid-cols-4 gap-2 p-4">
                    <ImageInput
                      type="whychoose"
                      title="whychooseImage"
                      index={index}
                      watchAll={watchAll}
                      setValue={setValue}
                    />

                    {whychooseInputFields.map(({ name, placeholder }) => (
                      <FormInput
                        key={name}
                        placeholder={placeholder}
                        name={`whychoose.${index}.${name}`}
                        register={register}
                      />
                    ))}
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
            whychooseImage: '',
            whychooseIcon: '',
            whychooseName: '',
            whychooseSubName: '',
            whychooseBtnName: '',
            whychooseBtnUrl: '',
          }}
        />
      </>
    );
  }
);

export default WhychooseComp;
