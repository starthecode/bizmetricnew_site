import { useFieldArray, useForm } from 'react-hook-form';
import React from 'react';
import { fiveboxesInputFields } from '../../../utils/fields';
import FormInput from '../../Inputs/FormInput';

const FiveInputs = React.forwardRef(({ fiveinputsData }, ref) => {
  const { register, control, setValue, getValues } = useForm({
    defaultValues: {
      fiveinputs: fiveinputsData || [{}],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'fiveinputs',
  });

  React.useImperativeHandle(ref, () => ({
    getData: () => getValues('fiveinputs') || [],
  }));

  React.useEffect(() => {
    if (fiveinputsData) {
      setValue('fiveinputs', fiveinputsData);
    }
  }, [fiveinputsData, setValue]);

  React.useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [fields.length, append]);

  return (
    <div className="w-full space-y-4">
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="w-full">
              <div className="grid grid-cols-4 gap-2 p-4">
                {fiveboxesInputFields.map(({ name, placeholder }) => (
                  <FormInput
                    key={name}
                    placeholder={placeholder}
                    name={`fiveinputs.${index}.${name}`}
                    register={register}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default FiveInputs;
