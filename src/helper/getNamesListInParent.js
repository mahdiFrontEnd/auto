export const getNamesListInParent = (obj) => {
  const names = [];
  while (obj) { // تا وقتی که والد وجود دارد، name را اضافه کن
    names.unshift(obj.name); // اضافه کردن name به اول آرایه
    obj = obj.parent; // حرکت به سمت والد
  }

  return names.join(' / '); // ترکیب مقادیر با ">"
};