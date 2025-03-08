import { toast } from 'react-toastify';
import Storehouse from './Storehouse';

const GetStorehouseList = (setStorehouseList, setLoading) => {


  Storehouse.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: (result) => {
      console.log(result,'llll');
      setStorehouseList(result.result);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);

    },
  }).storehouseList();

};
export default GetStorehouseList;


