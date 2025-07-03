import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputLabel from '../Form_Fields/InputLabel';

const SolutionLinkField = forwardRef(({ twoLinksData }, ref) => {
  const { register, getValues, reset } = useForm({
    defaultValues: {
      linkboxes: {
        link1: twoLinksData?.link1 || '',
        link2: twoLinksData?.link2 || '',
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getData: () => getValues('linkboxes'),
  }));

  useEffect(() => {
    reset({
      linkboxes: {
        link1: twoLinksData?.link1 || '',
        link2: twoLinksData?.link2 || '',
      },
    });
  }, [twoLinksData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold mt-5">Link Boxes</h2>

      <div className="grid grid-cols-2 gap-4 w-full">
        <InputLabel
          label="Link 1"
          name="linkboxes.link1"
          type="text"
          placeholder="Add Link 1"
          register={register}
        />
        <InputLabel
          label="Link 2"
          name="linkboxes.link2"
          type="text"
          placeholder="Add Link 2"
          register={register}
        />
      </div>
    </>
  );
});

export default SolutionLinkField;
