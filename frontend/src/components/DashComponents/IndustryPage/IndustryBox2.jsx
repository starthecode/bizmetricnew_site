import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import { threeInputFields } from '../../../utils/fields';
import FormInput from '../../Inputs/FormInput';

const IndustryBox2 = forwardRef(({ industryBox2Data }, ref) => {
  const { register, control, setValue, getValues } = useForm({
    defaultValues: {
      industrybox2: industryBox2Data,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'industrybox2',
  });

  const [collapsedIndustryBox2, setCollapsedIndustryBox2] = useState([]);

  const toggleIndustryBox2 = (index) => {
    setCollapsedIndustryBox2((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getIndustryBox2Data: () => getValues('industrybox2'),
  }));

  React.useEffect(() => {
    setValue('industrybox2', industryBox2Data);
  }, [industryBox2Data, setValue]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Industry Box Two</h2>

      {fields.map((item, index) => {
        const isCollapsed = collapsedIndustryBox2.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-flamingo-500/30 rounded-t">
              <span className="font-medium">Industry Box {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={toggleIndustryBox2}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  {threeInputFields.map(({ name, placeholder }) => (
                    <FormInput
                      key={name}
                      placeholder={placeholder}
                      name={`industrybox2.${index}.${name}`}
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
          textInput1: '',
          textInput2: '',
          textInput3: '',
        }}
      />
    </>
  );
});

export default IndustryBox2;
