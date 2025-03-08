export const getCategory = (data) => {
  let category = data;
  let name = '';
  while (category) {
    name += `${category?.name} ${category.children_category ? ' / ' : ''}`;
    category = category.children_category;
  }
  return name;
};