import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Storehouse from '../../../../api/http_request/Model/storehouse/Storehouse';
import {
  handleBuyerList,
  handleNextStatusesList,
  handleReceiptAndRemittanceArray,
  handleReceiptAndRemittanceData,
  handleSetInOut,
  handleStorekeeperList,
  setLoading,
} from '../../../../store/storehouse/StorehouseSlice';
import TableForm from './TableForm/TableForm';
import TopBoxData from './topForm/TopBoxData';

const ShowReceiptProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    Storehouse.request({
      beforeSend: () => {
        dispatch(setLoading(true));
      },
      success: ({ result }) => {
        const productsArray = result?.products;
        dispatch(
          handleReceiptAndRemittanceData({
            ...result,
            request_name: result?.request_name,
            description: result?.description,
            another_product: 0,
          }),
        );
        if (productsArray) {
          const nexStatusListArray = productsArray[0]?.next_statuses || [];
          // const firstNexStatusId = nexStatusListArray[0]?.id;
          dispatch(handleSetInOut('in'));
          // dispatch(handleSetInOut(firstNexStatusId === 23 ? 'in' : 'out'));
          dispatch(handleReceiptAndRemittanceArray(productsArray));

          if (result?.buyers) {
            let buyersArray = [];
            buyersArray = result?.buyers.map((item) => {
              return {
                value: `${item.user?.id}${item?.id}`,
                key: item?.id,
                user_id: item.user?.id,
                position_id: item?.id,
                label: `${item.position} - ${item.user.first_name} ${item.user.last_name}`,
              };
            });
            dispatch(handleBuyerList(buyersArray || []));
          }
          if (result?.storekeepers) {
            let storekeepersArray = [];
            storekeepersArray = result?.storekeepers.map((item) => {
              return {
                value: `${item.user?.id}${item?.id}`,
                key: item?.id,
                user_id: item.user?.id,
                position_id: item?.id,
                label: `${item.position} - ${item.user.first_name} ${item.user.last_name}`,
              };
            });
            dispatch(handleStorekeeperList(storekeepersArray || []));
          }
          if (nexStatusListArray.length) {
            dispatch(handleNextStatusesList(nexStatusListArray));
          }
        }
      },
      final: () => {
        dispatch(setLoading(false));
      },
    }).showReceipt(id);
  }, []);

  return (
    <>
      <TopBoxData />
      <div className="mb-3 defBox">
        <TableForm />
      </div>
    </>
  );
};

export default ShowReceiptProduct;
