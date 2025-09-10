import  {
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
import { fiveboxesInputFields } from '../../../utils/fields';

const FiveBoxes = forwardRef(({ fiveBoxesData }, ref) => {
  const { register, control, getValues, reset } = useForm({
    defaultValues: {
      fiveboxes: {
        title: fiveBoxesData?.title || '',
        subtitle: fiveBoxesData?.subtitle || '',
        extratext: fiveBoxesData?.extratext || '',
        items: fiveBoxesData?.items || [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fiveboxes.items',
  });

  const [collapsedFiveBoxes, setCollapsedFiveBoxes] = useState([]);

  const toggleFiveBoxes = (index) => {
    setCollapsedFiveBoxes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getData: () => getValues('fiveboxes'),
  }));

  useEffect(() => {
    reset({
      fiveboxes: {
        title: fiveBoxesData?.title || '',
        subtitle: fiveBoxesData?.subtitle || '',
        extratext: fiveBoxesData?.extratext || '',
        items: fiveBoxesData?.items || [],
      },
    });
  }, [fiveBoxesData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Five Boxes</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputLabel
          label="Title"
          name="fiveboxes.title"
          type="text"
          placeholder="Enter title"
          register={register}
        />
        <InputLabel
          label="Subtitle"
          name="fiveboxes.subtitle"
          type="text"
          placeholder="Enter subtitle"
          register={register}
        />
        <InputLabel
          label="ExtraText"
          name="fiveboxes.extratext"
          type="text"
          placeholder="Enter Extra Text"
          register={register}
        />
      </div>

      {fields.map((item, index) => {
        const isCollapsed = collapsedFiveBoxes.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-flamingo-500/30 rounded-t">
              <span className="font-medium">Five Box {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={toggleFiveBoxes}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  {fiveboxesInputFields.map(({ name, placeholder }) => (
                    <FormInput
                      key={name}
                      placeholder={placeholder}
                      name={`fiveboxes.items.${index}.${name}`}
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
          fiveboxesinput1: '',
          fiveboxesinput2: '',
          fiveboxesinput3: '',
          fiveboxesinput4: '',
          fiveboxesinput5: '',
        }}
      />
    </>
  );
});

export default FiveBoxes;
