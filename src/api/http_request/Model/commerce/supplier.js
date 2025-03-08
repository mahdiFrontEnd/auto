import Commerce from './Commerce';

const GetSupplierList = (setSupplierList, setSuppliersLoading) => {
  // eslint-disable-next-line no-unused-expressions
  setSuppliersLoading && setSuppliersLoading(true);
  Commerce.request({
    success: (data) => {
      // eslint-disable-next-line no-unused-expressions
      setSuppliersLoading && setSuppliersLoading(false);
      setSupplierList(data?.result.data);
    },
  }).supplier();

};
export default GetSupplierList;


