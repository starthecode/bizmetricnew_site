import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputLabel from '../Form_Fields/InputLabel';

const ExtraInputFields = forwardRef(({ initialData = {} }, ref) => {
  const { register, getValues, reset } = useForm({
    defaultValues: {
      extrainputfields: {
        inputfield1: initialData.inputfield1 || '',
        inputfield2: initialData.inputfield2 || '',
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getData: () => getValues('extrainputfields'),
  }));

  useEffect(() => {
    reset({
      extrainputfields: {
        inputfield1: initialData.inputfield1 || '',
        inputfield2: initialData.inputfield2 || '',
      },
    });
  }, [initialData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold mt-5">Extra Input Fields</h2>
      <div className="grid grid-cols-2 gap-4 w-full">
        <InputLabel
          label="Input Field 1"
          name="extrainputfields.inputfield1"
          type="text"
          placeholder="Add Input Field 1"
          register={register}
        />
        <InputLabel
          label="Input Field 2"
          name="extrainputfields.inputfield2"
          type="text"
          placeholder="Add Input Field 2"
          register={register}
        />
      </div>
    </>
  );
});

export default ExtraInputFields;
