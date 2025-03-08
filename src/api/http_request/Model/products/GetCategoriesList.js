import { toast } from 'react-toastify';
import Products from './Products';

const GetCategoryList = (setCategoryList, setLoading, params = {}) => {


  Products.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: (result) => {

      setCategoryList(result.result.data);
    },
    error: ({ error }) => {
      toast.error(error.data.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);

    },
  }).addParams({ ...params }).categoryList();

};


export default GetCategoryList;
