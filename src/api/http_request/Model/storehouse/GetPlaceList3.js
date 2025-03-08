import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setPlaceList, setPlaceListLoading } from '../../../../store/storehouse/StorehouseSlice';
import Storehouse from './Storehouse';


const useGetPlaceList = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    Storehouse.request({
      beforeSend: () => {
        dispatch(setPlaceListLoading(true));
      }, success: ({ result }) => {
        const setSelected = (array) => {
          array.forEach((item) => {
            if (item.children && item.children.length > 0 && item.has_partition !== 1) {
              item.selectable = false; // مقدار false را برای فیلد selected تنظیم می‌کنیم
              setSelected(item.children); // فراخوانی بازگشتی برای بررسی children
            }else {
              item.children = null
            }
          });
        };

        setSelected(result);
        dispatch(setPlaceList(result));
      }, error: ({ error }) => {
        toast.error(error.data.message);
      }, final: () => {
        dispatch(setPlaceListLoading(false));
      },
    }).listPlaceForStorekeeperLogin();
  }, [dispatch]);
};

export default useGetPlaceList;

