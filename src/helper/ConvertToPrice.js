export const ConvertToPrice = (x) => {
  return x?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
