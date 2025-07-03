import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import FormInput from '../../Inputs/FormInput';
import { overviewboxesInputFields } from '../../../utils/fields';

const OverviewBoxes = forwardRef(({ overviewBoxesData }, ref) => {
  const { register, control, setValue, getValues } = useForm({
    defaultValues: {
      overviewboxes: overviewBoxesData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'overviewboxes',
  });

  const [collapsedOverviewBoxes, setCollapsedOverviewBoxes] = useState([]);

  const toggleOverviewBoxes = (index) => {
    setCollapsedOverviewBoxes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getOverviewBoxesData: () => getValues('overviewboxes'),
  }));

  React.useEffect(() => {
    setValue('overviewboxes', overviewBoxesData);
  }, [overviewBoxesData, setValue]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Overview Boxes</h2>

      {fields.map((item, index) => {
        const isCollapsed = collapsedOverviewBoxes.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-flamingo-500/30 rounded-t">
              <span className="font-medium">Overview Boxes {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={toggleOverviewBoxes}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  {overviewboxesInputFields.map(({ name, placeholder }) => (
                    <FormInput
                      key={name}
                      placeholder={placeholder}
                      name={`overviewboxes.${index}.${name}`}
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
          servicesImage: '',
          servicesName: '',
          servicesDesc: '',
          servicesLink: '',
        }}
      />
    </>
  );
});

export default OverviewBoxes;
