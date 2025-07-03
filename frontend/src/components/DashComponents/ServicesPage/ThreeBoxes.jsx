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
import { threeboxesInputFields } from '../../../utils/fields';
import FormInput from '../../Inputs/FormInput';
import InputLabel from '../../Form_Fields/InputLabel';

const ThreeBoxes = forwardRef(({ threeBoxesData }, ref) => {
  const { register, control, setValue, getValues, reset } = useForm({
    defaultValues: {
      threeboxes: {
        title: threeBoxesData?.title || '',
        subtitle: threeBoxesData?.subtitle || '',
        extratext: threeBoxesData?.extratext || '',
        items: threeBoxesData?.items || [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'threeboxes.items',
  });

  const [collapsedThreeBoxes, setCollapsedThreeBoxes] = useState([]);

  const toggleThreeBoxes = (index) => {
    setCollapsedThreeBoxes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getThreeBoxesData: () => getValues('threeboxes'),
  }));

  useEffect(() => {
    reset({
      threeboxes: {
        title: threeBoxesData?.title || '',
        subtitle: threeBoxesData?.subtitle || '',
        extratext: threeBoxesData?.extratext || '',
        items: threeBoxesData?.items || [],
      },
    });
  }, [threeBoxesData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Three Boxes</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputLabel
          label="Title"
          name="threeboxes.title"
          type="text"
          placeholder="Enter title"
          register={register}
        />
        <InputLabel
          label="Subtitle"
          name="threeboxes.subtitle"
          type="text"
          placeholder="Enter subtitle"
          register={register}
        />
        <InputLabel
          label="ExtraText"
          name="threeboxes.extratext"
          type="text"
          placeholder="Enter Extra Text"
          register={register}
        />
      </div>

      {fields.map((item, index) => {
        const isCollapsed = collapsedThreeBoxes.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-flamingo-500/30 rounded-t">
              <span className="font-medium">Three Box {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={toggleThreeBoxes}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  {threeboxesInputFields.map(({ name, placeholder }) => (
                    <FormInput
                      key={name}
                      placeholder={placeholder}
                      name={`threeboxes.items.${index}.${name}`}
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
          threeboxesinput1: '',
          threeboxesinput2: '',
          threeboxesinput3: '',
        }}
      />
    </>
  );
});

export default ThreeBoxes;
