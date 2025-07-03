import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputLabel from '../../Form_Fields/InputLabel';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';

const IndustryComp = forwardRef(
  ({ industryData, industryTitle, setIndustryTitle }, ref) => {
    const { register, control, setValue, getValues } = useForm({
      defaultValues: {
        industry: industryData,
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'industry',
    });

    const [collapsedIndustry, setCollapsedIndustry] = useState([]);

    const toggleIndustry = (index) => {
      setCollapsedIndustry((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    };

    useImperativeHandle(ref, () => ({
      getIndustryData: () => getValues('industry'),
    }));

    React.useEffect(() => {
      setValue('industry', industryData);
    }, [industryData, setValue]);

    const handleIndustryTitleChange = (e) => {
      setIndustryTitle(e.target.value);
    };

    return (
      <>
        <InputLabel
          label="Industry Title"
          name="industryTitle"
          type="text"
          placeholder="Enter Text"
          value={industryTitle}
          onChange={handleIndustryTitleChange}
        />

        {fields.map((item, index) => {
          const isCollapsed = collapsedIndustry.includes(index);

          return (
            <div
              key={item.id}
              className="border rounded shadow-sm bg-gray-50 mb-4"
            >
              <div className="flex justify-between items-center p-2 bg-gray-200 rounded-t">
                <span className="font-medium">Industry {index + 1}</span>
                <DropdownButton
                  isCollapsed={isCollapsed}
                  toggleAction={toggleIndustry}
                  index={index}
                />
              </div>

              {!isCollapsed && (
                <div className="w-full">
                  <div className="grid grid-cols-4 gap-2 p-4">
                    <input
                      placeholder="Industry Icon"
                      {...register(`industry.${index}.industryIcon`)}
                    />
                    <input
                      placeholder="Industry Name"
                      {...register(`industry.${index}.industryName`)}
                    />

                    <input
                      placeholder="Industry ID"
                      {...register(`industry.${index}.industryId`)}
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
            industryIcon: '',
            industryName: '',
            industryId: '',
          }}
        />
      </>
    );
  }
);

export default IndustryComp;
