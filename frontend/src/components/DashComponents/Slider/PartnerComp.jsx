import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputLabel from '../../Form_Fields/InputLabel';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import FormInput from '../../Inputs/FormInput';

const PartnerComp = forwardRef(({ partnersLogoData }, ref) => {
  const { register, control, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      partnerslogo: {
        title: partnersLogoData?.title || '',
        subtitle: partnersLogoData?.subtitle || '',
        extratext: partnersLogoData?.extratext || '',
        items: partnersLogoData?.items || [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partnerslogo.items',
  });

  const watchAll = watch();

  const [collapsedPartners, setCollapsedPartners] = useState([]);

  const togglePartner = (index) => {
    setCollapsedPartners((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getData: () => getValues('partnerslogo'),
  }));

  React.useEffect(() => {
    reset({
      partnerslogo: {
        title: partnersLogoData?.title || '',
        subtitle: partnersLogoData?.subtitle || '',
        extratext: partnersLogoData?.extratext || '',
        items: partnersLogoData?.items || [],
      },
    });
  }, [partnersLogoData, reset]);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Partners Logo</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputLabel
          label="Title"
          name="partnerslogo.title"
          type="text"
          placeholder="Enter title"
          register={register}
        />
        <InputLabel
          label="Subtitle"
          name="partnerslogo.subtitle"
          type="text"
          placeholder="Enter subtitle"
          register={register}
        />
        <InputLabel
          label="ExtraText"
          name="partnerslogo.extratext"
          type="text"
          placeholder="Enter Extra Text"
          register={register}
        />
      </div>

      {fields.map((item, index) => {
        const isCollapsed = collapsedPartners.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-gray-200 rounded-t">
              <span className="font-medium">Partner {index + 1}</span>

              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={togglePartner}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  {['logoUrl', 'caseStudyUrl'].map((name) => (
                    <FormInput
                      key={name}
                      placeholder={name}
                      name={`partnerslogo.items.${index}.${name}`}
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
          logoUrl: '',
          caseStudyUrl: '',
        }}
      />
    </>
  );
});

export default PartnerComp;
