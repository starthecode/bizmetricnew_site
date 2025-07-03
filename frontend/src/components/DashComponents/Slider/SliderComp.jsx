import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import ImageInput from '../../Inputs/ImageInput';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import { sliderInputFields } from '../../../utils/fields';
import FormInput from '../../Inputs/FormInput';

const SliderForm = forwardRef(({ slidersData }, ref) => {
  const { register, control, watch, setValue, getValues } = useForm({
    defaultValues: {
      sliders: slidersData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sliders',
  });

  const watchAll = watch();

  const [collapsedSliders, setCollapsedSliders] = useState([]);

  const toggleSlider = (index) => {
    setCollapsedSliders((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getSlidersData: () => getValues('sliders'),
  }));

  React.useEffect(() => {
    setValue('sliders', slidersData);
  }, [slidersData, setValue]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Sliders</h2>

      {fields.map((item, index) => {
        const isCollapsed = collapsedSliders.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-flamingo-500/30 rounded-t">
              <span className="font-medium">Slider {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={toggleSlider}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  <ImageInput
                    type="sliders"
                    title="sliderImage"
                    index={index}
                    watchAll={watchAll}
                    setValue={setValue}
                  />

                  {sliderInputFields.map(({ name, placeholder }) => (
                    <FormInput
                      key={name}
                      placeholder={placeholder}
                      name={`sliders.${index}.${name}`}
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
          sliderImage: '',
          smallText: '',
          titleText: '',
          subText: '',
          subTextTwo: '',
          subTextThree: '',
          buttonText: '',
          buttonUrl: '',
          buttonTextTwo: '',
          buttonUrlTwo: '',
          customClass: '',
          customClassTwo: '',
          isCustom: '',
        }}
      />
    </>
  );
});

export default SliderForm;
