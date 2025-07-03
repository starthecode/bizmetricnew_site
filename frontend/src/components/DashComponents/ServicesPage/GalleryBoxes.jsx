import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import FormInput from '../../Inputs/FormInput';
import InputLabel from '../../Form_Fields/InputLabel';
import GalleryMultiImageInput from '../../Inputs/GalleryMultiImageInput';

const GalleryBoxes = forwardRef(({ galleryBoxesData }, ref) => {
  const { register, control, setValue, getValues, reset } = useForm({
    defaultValues: {
      galleryboxes: {
        title: galleryBoxesData?.title || '',
        subtitle: galleryBoxesData?.subtitle || '',
        extratext: galleryBoxesData?.extratext || '',
        items: galleryBoxesData?.items || [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'galleryboxes.items',
  });

  const [collapsedGalleryBoxes, setcollapsedGalleryBoxes] = useState([]);

  const toggleGalleryBoxes = (index) => {
    setcollapsedGalleryBoxes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getGalleryBoxesData: () => getValues('galleryboxes'),
  }));

  useEffect(() => {
    reset({
      galleryboxes: {
        title: galleryBoxesData?.title || '',
        subtitle: galleryBoxesData?.subtitle || '',
        extratext: galleryBoxesData?.extratext || '',
        items: galleryBoxesData?.items || [],
      },
    });
  }, [galleryBoxesData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Gallery Boxes</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputLabel
          label="Title"
          name="galleryboxes.title"
          type="text"
          placeholder="Enter title"
          register={register}
        />
        <InputLabel
          label="Subtitle"
          name="galleryboxes.subtitle"
          type="text"
          placeholder="Enter subtitle"
          register={register}
        />
        <InputLabel
          label="ExtraText"
          name="galleryboxes.extratext"
          type="text"
          placeholder="Enter Extra Text"
          register={register}
        />
      </div>

      {fields.map((item, index) => {
        const isCollapsed = collapsedGalleryBoxes.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-flamingo-500/30 rounded-t">
              <span className="font-medium">Gallery Box {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={toggleGalleryBoxes}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex gap-3 my-3">
                    {['galleryboxesinput1', 'galleryboxesinput2'].map(
                      (name) => (
                        <FormInput
                          key={name}
                          placeholder={`Enter ${name}`}
                          name={`galleryboxes.items.${index}.${name}`}
                          register={register}
                        />
                      )
                    )}
                  </div>

                  <GalleryMultiImageInput
                    name="galleryboxesfile"
                    index={index}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
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
          galleryboxesinput1: '',
          galleryboxesinput2: '',
          galleryboxesfile: [{ imageLink: '', imageName: '' }],
        }}
      />
    </>
  );
});

export default GalleryBoxes;
