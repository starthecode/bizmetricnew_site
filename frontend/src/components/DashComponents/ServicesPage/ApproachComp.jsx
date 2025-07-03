import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import { approachInputFields } from '../../../utils/fields';
import FormInput from '../../Inputs/FormInput';

const ApproachComp = forwardRef(({ approachData }, ref) => {
  const { register, control, setValue, getValues } = useForm({
    defaultValues: {
      approach: approachData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'approach',
  });

  const [collapsedApproach, setCollapsedApproach] = useState([]);

  const toggleApproach = (index) => {
    setCollapsedApproach((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getApproachBoxesData: () => getValues('approach'),
  }));

  React.useEffect(() => {
    setValue('approach', approachData);
  }, [approachData, setValue]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Approach</h2>

      {fields.map((item, index) => {
        const isCollapsed = collapsedApproach.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-flamingo-500/30 rounded-t">
              <span className="font-medium">Approach {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={toggleApproach}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  {approachInputFields.map(({ name, placeholder }) => (
                    <FormInput
                      key={name}
                      placeholder={placeholder}
                      name={`approach.${index}.${name}`}
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
          approachInput1: '',
          approachInput2: '',
          approachInput3: '',
        }}
      />
    </>
  );
});

export default ApproachComp;
