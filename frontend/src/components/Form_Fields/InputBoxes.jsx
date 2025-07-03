import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextAreaLabel from './TextAreaLabel';
import InputLabel from './InputLabel';

const InputBoxes = forwardRef(({ inputBoxesData }, ref) => {
  const { register, getValues, reset } = useForm({
    defaultValues: {
      inputboxes: {
        title: inputBoxesData?.title || '',
        subtitle: inputBoxesData?.subtitle || '',
        extratext: inputBoxesData?.extratext || '',
        inputarea: inputBoxesData?.inputarea || '',
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getData: () => getValues('inputboxes'),
  }));

  useEffect(() => {
    reset({
      inputboxes: {
        title: inputBoxesData?.title || '',
        subtitle: inputBoxesData?.subtitle || '',
        extratext: inputBoxesData?.extratext || '',
        inputarea: inputBoxesData?.inputarea || '',
      },
    });
  }, [inputBoxesData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Input Boxes</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputLabel
          label="Title"
          name="inputboxes.title"
          type="text"
          placeholder="Enter title"
          register={register}
        />
        <InputLabel
          label="Subtitle"
          name="inputboxes.subtitle"
          type="text"
          placeholder="Enter subtitle"
          register={register}
        />
        <InputLabel
          label="ExtraText"
          name="inputboxes.extratext"
          type="text"
          placeholder="Enter Extra Text"
          register={register}
        />
      </div>
      <TextAreaLabel
        label="Input Area"
        name="inputboxes.inputarea"
        placeholder="Add Text Content"
        register={register}
      />
    </>
  );
});

export default InputBoxes;
