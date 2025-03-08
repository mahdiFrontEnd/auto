import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Products from './Products';
import { setProductList, setProductListLoading } from '../../../../store/storehouse/StorehouseSlice';


const useGetProductListStoreOut = () => {
  const dispatch = useDispatch();

  return useCallback((params = { take: 50000 }) => {
    Products.request({
      beforeSend: () => {
        dispatch(setProductListLoading(true));
      },
      success: ({ result }) => {
        console.log(result);
        dispatch(setProductList(result?.products));
      },
      error: ({ error }) => {
        toast.error(error.data.message);
      },
      final: () => {
        dispatch(setProductListLoading(false));
      },
    }).addParams(params).ProductListStoreOut();
  }, [dispatch]);
};

export default useGetProductListStoreOut;

