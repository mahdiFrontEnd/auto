import { toast } from 'react-toastify';
import Products from './Products';

const getCategoryListForProduct = (setCategoryList, setLoading, params = {}) => {


  Products.request({
    beforeSend: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(true);
    },
    success: (result) => {

      setCategoryList(result.result);
    },
    error: (error) => {
      toast.error(error.message);
    },
    final: () => {
      // eslint-disable-next-line no-unused-expressions
      setLoading && setLoading(false);

    },
  }).addParams({ ...params }).categoryList('category-list-for-product');

};


export default getCategoryListForProduct;
