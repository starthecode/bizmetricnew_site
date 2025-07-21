import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import toast from 'react-hot-toast';

const flattenTree = (items, parentId = null, depth = 0) => {
  return items
    .filter((item) => item.parentId === parentId)
    .map((item) => [
      { ...item, depth },
      ...flattenTree(items, item.key, depth + 1),
    ])
    .flat();
};

const MenuItem = ({ item, onDelete, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.key });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    marginLeft: `${item.depth * 30}px`,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-white border px-4 py-3 rounded shadow-sm flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        {/* Drag handle icon */}
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 select-none"
        >
          ⠿
        </span>
        <span className="font-medium">
          {item.title}
          {item.depth > 0 && (
            <span className="text-sm text-gray-400 italic ml-2">sub item</span>
          )}
        </span>
      </div>

      {/* Delete button (not inside listeners) */}
      <div className="flex gap-3 text-sm">
        <button
          onClick={() => onEdit(item)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.key, item.title)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    url: '',
    description: '',
    showMenuLabel: false,
    showMegaMenu: false,
    showServicesMegaMenu: false,
    menuClasses: '',
    menuLabel: '',
  });
  const [activeId, setActiveId] = useState(null);
  const [draggedItemOffsetX, setDraggedItemOffsetX] = useState(0);
  const [pendingItems, setPendingItems] = useState([]);
  const [editKey, setEditKey] = useState(null); // new

  const fetchMenu = async () => {
    const res = await fetch('/api/menu');
    const data = await res.json();
    setMenuItems(data.data.menuItems.nodes);
    setPendingItems(data.data.menuItems.nodes);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editKey) {
      // update existing item
      const updatedItem = {
        ...form,
        key: editKey,
        path: form.url,
        menuAcfFields: {
          showMenuLabel: form.showMenuLabel,
          showMegaMenu: form.showMegaMenu,
          showServicesMegaMenu: form.showServicesMegaMenu,
          menuClasses: form.menuClasses,
          menuIcon: null,
          menuLabel: form.menuLabel,
        },
      };

      await fetch(`/api/menu/${editKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });

      setEditKey(null);
    } else {
      // add new item
      const key = Date.now().toString();
      const newItem = {
        key,
        title: form.title,
        url: form.url,
        path: form.url,
        parentId: null,
        position: pendingItems.length,
        description: form.description,
        menuAcfFields: {
          showMenuLabel: form.showMenuLabel,
          showMegaMenu: form.showMegaMenu,
          showServicesMegaMenu: form.showServicesMegaMenu,
          menuClasses: form.menuClasses,
          menuIcon: null,
          menuLabel: form.menuLabel,
        },
      };

      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
    }

    setForm({
      title: '',
      url: '',
      description: '',
      showMenuLabel: false,
      showMegaMenu: false,
      showServicesMegaMenu: false,
      menuClasses: '',
      menuLabel: '',
    });
    fetchMenu();
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || '',
      url: item.url || '',
      description: item.description || '',
      showMenuLabel: item.menuAcfFields?.showMenuLabel || false,
      showMegaMenu: item.menuAcfFields?.showMegaMenu || false,
      showServicesMegaMenu: item.menuAcfFields?.showServicesMegaMenu || false,
      menuClasses: item.menuAcfFields?.menuClasses || '',
      menuLabel: item.menuAcfFields?.menuLabel || '',
    });
    setEditKey(item.key);
  };

  const handleDelete = async (key, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${title} item?`
    );
    if (!confirmDelete) return;

    await fetch(`/api/menu/${key}`, { method: 'DELETE' });
    fetchMenu();
  };

  const handleSaveMenu = async () => {
    const updates = pendingItems.map((item, index) => {
      const itemWithPosition = { ...item, position: index }; // assign new position

      return fetch(`/api/menu/${item.key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemWithPosition),
      });
    });

    toast.loading('Please Wait..');
    toast.dismiss();
    await Promise.all(updates);
    toast.success('Menu saved successfully!');
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragMove = (event) => {
    if (event?.delta?.x) {
      setDraggedItemOffsetX(event.delta.x);
    }
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const updated = [...pendingItems];
    const draggedIndex = updated.findIndex((i) => i.key === active.id);
    const overIndex = updated.findIndex((i) => i.key === over.id);

    if (draggedIndex === -1 || overIndex === -1) return;

    const draggedItem = updated[draggedIndex];

    // Remove item from original position
    updated.splice(draggedIndex, 1);

    const shouldBecomeChild = draggedItemOffsetX > 30;

    // Set parentId if should become child
    if (shouldBecomeChild) {
      draggedItem.parentId = updated[overIndex].key;
    } else {
      // If not becoming a child, preserve parent if same level or set null
      draggedItem.parentId = updated[overIndex].parentId ?? null;
    }

    // Recalculate index in case dragged item moved upward
    const insertIndex = draggedIndex < overIndex ? overIndex : overIndex + 1;

    updated.splice(insertIndex, 0, draggedItem);

    setPendingItems(updated);
    setDraggedItemOffsetX(0);
  };

  const flatMenu = flattenTree(pendingItems);

  return (
    <div className="w-full mx-auto mt-5">
      <div className="flex gap-5">
        <div className="bg-white max-w-lg w-full p-6 shadow rounded h-fit">
          <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <div className="flex gap-5">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="URL"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none"
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none"
            />
            <div className="flex gap-5">
              <label className="block text-xs">
                <input
                  type="checkbox"
                  checked={form.showMenuLabel}
                  onChange={(e) =>
                    setForm({ ...form, showMenuLabel: e.target.checked })
                  }
                  className="mr-2"
                />
                Show Menu Label
              </label>

              <label className="block text-xs">
                <input
                  type="checkbox"
                  checked={form.showMegaMenu}
                  onChange={(e) =>
                    setForm({ ...form, showMegaMenu: e.target.checked })
                  }
                  className="mr-2"
                />
                Show Mega Menu
              </label>
              <label className="block text-xs">
                <input
                  type="checkbox"
                  checked={form.showServicesMegaMenu}
                  onChange={(e) =>
                    setForm({ ...form, showServicesMegaMenu: e.target.checked })
                  }
                  className="mr-2"
                />
                Show Services Mega Menu
              </label>
            </div>
            <div className="flex gap-5">
              <input
                type="text"
                placeholder="Menu Classes"
                value={form.menuClasses}
                onChange={(e) =>
                  setForm({ ...form, menuClasses: e.target.value })
                }
                className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none"
              />
              <input
                type="text"
                placeholder="Menu Label"
                value={form.menuLabel}
                onChange={(e) =>
                  setForm({ ...form, menuLabel: e.target.value })
                }
                className="w-full border px-4 py-2 rounded shadow-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-flamingo-500/10 font-bold text-flamingo-500 px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Menu
            </button>
          </form>
        </div>
        <div className="block">
          <div className="flex flex-col gap-4 w-full h-[500px] overflow-y-auto pb-10">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={flatMenu.map((item) => item.key)}
                strategy={verticalListSortingStrategy}
              >
                <ul className="space-y-2">
                  {flatMenu.map((item) => (
                    <MenuItem
                      key={item.key}
                      item={item}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                </ul>
              </SortableContext>

              <DragOverlay>
                {activeId ? (
                  <div className="bg-white px-4 py-2 border shadow rounded">
                    {flatMenu.find((i) => i.key === activeId)?.title}
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
          <div className="mt-10 text-right">
            <button
              onClick={handleSaveMenu}
              className="bg-junglegreen-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
