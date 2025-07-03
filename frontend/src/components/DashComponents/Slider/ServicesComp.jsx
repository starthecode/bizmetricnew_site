import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputLabel from '../../Form_Fields/InputLabel';
import DropdownButton from '../../Tabs/DropdownButton';
import RemoveButton from '../../Tabs/RemoveButton';
import AddButton from '../../Tabs/AddButton';
import ImageInput from '../../Inputs/ImageInput';
import FormInput from '../../Inputs/FormInput';
import { overviewboxesInputFields } from '../../../utils/fields';

const ServicesComp = forwardRef(
  ({ servicesData, servicesTitle, setServicesTitle }, ref) => {
    const { register, control, watch, setValue, getValues } = useForm({
      defaultValues: {
        services: servicesData,
      },
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'services',
    });

    const watchAll = watch();

    const [collapsedServices, setCollapsedServices] = useState([]);

    const toggleServices = (index) => {
      setCollapsedServices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    };

    useImperativeHandle(ref, () => ({
      getServicesData: () => getValues('services'),
    }));

    React.useEffect(() => {
      setValue('services', servicesData);
    }, [servicesData, setValue]);

    const handleServicesTitleChange = (e) => {
      setServicesTitle(e.target.value);
    };

    return (
      <>
        <h2 className="text-xl font-bold mb-4">Services</h2>
        <InputLabel
          label="Services Title"
          name="servicesTitle"
          type="text"
          placeholder="Enter Text"
          value={servicesTitle}
          onChange={handleServicesTitleChange}
        />

        {fields.map((item, index) => {
          const isCollapsed = collapsedServices.includes(index);

          return (
            <div
              key={item.id}
              className="border rounded shadow-sm bg-gray-50 mb-4"
            >
              <div className="flex justify-between items-center p-2 bg-gray-200 rounded-t">
                <span className="font-medium">Services {index + 1}</span>
                <DropdownButton
                  isCollapsed={isCollapsed}
                  toggleAction={toggleServices}
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
                        name={`services.${index}.${name}`}
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
  }
);

export default ServicesComp;
