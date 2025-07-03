import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ImageInput from '../../Inputs/ImageInput';

const ItemTypes = {
  FIELD: 'field',
};

const FieldItem = ({
  field,
  index,
  moveField,
  onTextChange,
  onImageChange,
  onImageRemove, // 👈 Receive remove function here
}) => {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.FIELD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`p-4 mb-5 border rounded-lg bg-gray-50 cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="mb-2 text-gray-500 cursor-grab">≡ Drag handle</div>

      {field.type === 'text' ? (
        <textarea
          value={field.value}
          onChange={(e) => onTextChange(field.id, e.target.value)}
          placeholder="Write something..."
          rows={15}
          className="w-full p-3 border rounded-md"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {field.value ? (
            <div className="relative group">
              <img
                src={field.value}
                alt="Uploaded"
                className="w-full rounded-md mb-2"
              />
              <button
                type="button"
                onClick={() => onImageRemove(field.id)} // 👈 Call remove function
                className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md hover:bg-red-600 transition-all"
              >
                ✖
              </button>
            </div>
          ) : (
            <p className="text-gray-400 italic">No image uploaded yet.</p>
          )}

          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => onImageChange(field.id, e)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
            "
          /> */}

          <ImageInput
            type="file"
            title=""
            index={index}
            watchAll={''}
            setValue={(name, value) => {
              onImageChange(field.id, value);
            }}
          />
        </div>
      )}
    </div>
  );
};

const BlogEditor = ({ setBlogContent, blogContent }) => {
  const [fields, setFields] = useState([
    { id: '1', type: 'text', value: '' },
    { id: '2', type: 'image', value: '' },
    { id: '3', type: 'text', value: '' },
  ]);

  // 🔥 Update fields whenever blogContent changes
  useEffect(() => {
    if (blogContent && blogContent.length > 0) {
      setFields(blogContent);
    }
  }, [blogContent]);

  // Initialize fields state with blogContent (coming from parent)
  //   const [fields, setFields] = useState(blogContent);

  useEffect(() => {
    // Ensure that changes to fields propagate to the parent component
    setBlogContent(fields);
  }, [fields, setBlogContent]);

  const moveField = (fromIndex, toIndex) => {
    const newFields = [...fields];
    const [removed] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, removed);
    setFields(newFields);
  };

  const handleTextChange = (id, newValue) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, value: newValue } : field
      )
    );
  };

  const handleImageChange = (id, eventOrUrl) => {
    if (eventOrUrl?.target?.files) {
      const file = eventOrUrl.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFields((prev) =>
            prev.map((field) =>
              field.id === id ? { ...field, value: e.target.result } : field
            )
          );
        };
        reader.readAsDataURL(file);
      }
    } else if (typeof eventOrUrl === 'string') {
      setFields((prev) =>
        prev.map((field) =>
          field.id === id ? { ...field, value: eventOrUrl } : field
        )
      );
    }
  };

  const handleImageRemove = (id) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, value: '' } : field))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Blog Editor (With Drag and Drop)
        </h1>
        {fields.map((field, index) => (
          <FieldItem
            key={field.id}
            index={index}
            field={field}
            moveField={moveField}
            onTextChange={handleTextChange}
            onImageChange={handleImageChange}
            onImageRemove={handleImageRemove} // 👈 Pass it
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BlogEditor;
