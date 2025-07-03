export const flatListToHierarchical = (
  data = [],
  options = {}
) => {
  const {
    idKey = 'key',
    parentKey = 'parentId',
    childrenKey = 'children',
  } = options;

  const tree = [];
  const childrenOf = {};

  data.forEach((item) => {
    const newItem = { ...item };
    const id = newItem[idKey];
    const parentId = newItem[parentKey] || 0;

    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];

    if (parentId) {
      childrenOf[parentId] = childrenOf[parentId] || [];
      childrenOf[parentId].push(newItem);
    } else {
      tree.push(newItem);
    }
  });

  return tree;
};
