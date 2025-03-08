import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Products from './Products';
import { setProductList, setProductListLoading } from '../../../../store/storehouse/StorehouseSlice';


const useGetProductList = () => {
  const dispatch = useDispatch();

  return useCallback((params = { take: 50000 }) => {
    Products.request({
      beforeSend: () => {
        dispatch(setProductListLoading(true));
      },
      success: ({ result }) => {
        dispatch(setProductList(result));
      },
      error: ({ error }) => {
        toast.error(error.data.message);
      },
      final: () => {
        dispatch(setProductListLoading(false));
      },
    }).addParams(params).ProductList();
  }, [dispatch]);
};

export default useGetProductList;

