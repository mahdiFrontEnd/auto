export const findItemById = (list, value, childrenName) => {
   // eslint-disable-next-line no-restricted-syntax
  for (const item of list) {
    if (item.id === value) {
      return item;
    }
    if (item[childrenName]) {
      const found = findItemById(item[childrenName], value, childrenName);
      if (found) return found;
    }
  }
  return null;
};
