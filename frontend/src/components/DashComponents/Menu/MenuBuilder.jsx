// import React, { useState } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// // import axios from 'axios';

// const ItemType = 'MENU_ITEM';

// const MenuItem = ({ item, moveItem, findItem, level = 0 }) => {
//   const originalIndex = findItem(item.id).index;

//   const [{ isDragging }, dragRef] = useDrag({
//     type: ItemType,
//     item: { id: item.id, originalIndex },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const [, dropRef] = useDrop({
//     accept: ItemType,
//     hover({ id: draggedId }) {
//       if (draggedId !== item.id) {
//         const { index: overIndex } = findItem(item.id);
//         moveItem(draggedId, overIndex);
//       }
//     },
//   });

//   return (
//     <div
//       ref={(node) => dragRef(dropRef(node))}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         paddingLeft: `${level * 20}px`,
//         border: '1px solid #ccc',
//         margin: '5px',
//         padding: '8px',
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       {item.title}
//       {item.children?.length > 0 &&
//         item.children.map((child) => (
//           <MenuItem
//             key={child.id}
//             item={child}
//             moveItem={moveItem}
//             findItem={findItem}
//             level={level + 1}
//           />
//         ))}
//     </div>
//   );
// };

// const MenuBuilder = () => {
//   const [menu, setMenu] = useState([
//     {
//       id: '1',
//       title: 'Services',
//       children: [
//         {
//           id: '2',
//           title: 'Artificial Intelligence',
//           children: [
//             {
//               id: '3',
//               title: 'GenAI',
//               children: [{ id: '4', title: 'Gen AI BOT', children: [] }],
//             },
//           ],
//         },
//         { id: '5', title: 'AI & Deep Learning', children: [] },
//         {
//           id: '6',
//           title: 'Machine Learning and Predictive Analytics',
//           children: [],
//         },
//         { id: '7', title: 'Recommendation Engines', children: [] },
//         { id: '8', title: 'AI/ML Ops', children: [] },
//       ],
//     },
//   ]);

//   const findItem = (id, items = menu, parent = null) => {
//     for (let i = 0; i < items.length; i++) {
//       if (items[i].id === id) {
//         return { item: items[i], index: i, parent };
//       }
//       if (items[i].children) {
//         const result = findItem(id, items[i].children, items[i]);
//         if (result) return result;
//       }
//     }
//   };

//   const moveItem = (id, atIndex) => {
//     const { item, index, parent } = findItem(id);
//     const list = parent ? parent.children : menu;
//     list.splice(index, 1);
//     list.splice(atIndex, 0, item);
//     setMenu([...menu]);
//   };

//   const saveMenu = async () => {
//     // try {
//     //   await axios.post('http://localhost:5000/save-menu', { menu });
//     //   alert('Menu saved successfully!');
//     // } catch (error) {
//     //   console.error(error);
//     //   alert('Failed to save menu.');
//     // }
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//         <h2>Menu Builder</h2>
//         {menu.map((item) => (
//           <MenuItem
//             key={item.id}
//             item={item}
//             moveItem={moveItem}
//             findItem={findItem}
//           />
//         ))}
//         <button onClick={saveMenu} style={{ marginTop: '20px' }}>
//           Save Menu
//         </button>
//       </div>
//     </DndProvider>
//   );
// };

// export default MenuBuilder;
