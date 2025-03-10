import { toast } from 'react-toastify';
import Common from './common';

const GetProductSku = (setCategoryList, setLoading, selectedWarehouseLocation) => {
  Common.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: ({ result }) => {
      // let arr = [];
      // // eslint-disable-next-line array-callback-return
      // result.map((item) => {
      //   arr = [...arr, { value: `${item.id}`, label: item.name ,children: item.skus}];
      // });
      setCategoryList(result);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);
    },
  }).addParams(selectedWarehouseLocation ? { warehouse_location_id: selectedWarehouseLocation } : {}).productSku();
};
export default GetProductSku;
