import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import AddButton from '../Tabs/AddButton';
import RemoveButton from '../Tabs/RemoveButton';
import DropdownButton from '../Tabs/DropdownButton';
import InputLabel from './InputLabel';

const PollFields = forwardRef(({ pollData }, ref) => {
  const { register, control, setValue, reset, getValues } = useForm({
    defaultValues: {
      poll: {
        title: pollData?.title || '',
        items: pollData?.items || [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'poll.items',
  });

  const [collapsedPoll, setCollapsedPoll] = useState([]);

  const togglePoll = (index) => {
    setCollapsedPoll((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  useImperativeHandle(ref, () => ({
    getData: () => getValues('poll'),
  }));

  React.useEffect(() => {
    reset({
      poll: {
        title: pollData?.title || '',

        items: pollData?.items || [],
      },
    });
  }, [pollData, reset]);

  return (
    <>
      <InputLabel
        label="Poll Title"
        name="poll.title"
        type="text"
        placeholder="Enter Title"
        register={register}
      />

      {fields.map((item, index) => {
        const isCollapsed = collapsedPoll.includes(index);

        return (
          <div
            key={item.id}
            className="border rounded shadow-sm bg-gray-50 mb-4"
          >
            <div className="flex justify-between items-center p-2 bg-gray-200 rounded-t">
              <span className="font-medium">Poll {index + 1}</span>
              <DropdownButton
                isCollapsed={isCollapsed}
                toggleAction={togglePoll}
                index={index}
              />
            </div>

            {!isCollapsed && (
              <div className="w-full">
                <div className="grid grid-cols-4 gap-2 p-4">
                  <input
                    placeholder="Poll Text1"
                    {...register(`poll.${index}.pollinput1`)}
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
          pollinput1: '',
        }}
      />
    </>
  );
});

export default PollFields;
