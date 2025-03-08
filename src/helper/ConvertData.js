export const handleData = (x) => {
  return x.flatMap(item =>
    typeof item === "string" && item.startsWith("[") && item.endsWith("]")
      ? JSON.parse(item)
      : [item]
  );

};




