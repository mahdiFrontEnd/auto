import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Storehouse from '../../../../api/http_request/Model/storehouse/Storehouse';
import {
  handleAddress,
  handleBuyerList,
  handleNextStatusesList,
  handleNextStep,
  handleProcessId,
  handleReceiptAndRemittanceArray,
  handleReceiptAndRemittanceData,
  handleSetInOut,
  handleStorekeeperList,
  handleType,
  setLoading,
} from '../../../../store/storehouse/StorehouseSlice';
import TopTableForm from './topForm/TopTableForm';
import TableForm from './TableForm/TableForm';
import TopBoxData from './topForm/TopBoxData';

const InventoryRequestSingle = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(handleType(props.type));
    dispatch(handleAddress(props.address));
  }, [props.type, props.address]);

  useEffect(() => {
    Storehouse.request({
      beforeSend: () => {
        dispatch(setLoading(true));
      },
      success: ({ result }) => {
        const productsArray = result?.total_product?.products;
        dispatch(
          handleReceiptAndRemittanceData({
            ...result,
            request_name: result?.request_name,
            description: result?.description,
            another_product: 0,
          }),
        );
        dispatch(handleProcessId(result.process_id));
        if (result.next_step) {
          dispatch(handleNextStep(result.next_step[0]));
        }
        if (productsArray) {
          const nexStatusListArray = productsArray[0]?.next_statuses || [];
          // const firstNexStatusId = nexStatusListArray[0]?.id;
          dispatch(handleSetInOut(productsArray[0]?.status.options?.in_out));
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
    })
      .setHeader('My-request', searchParams.get('my_request'))
      .showRequestWare(id);
  }, []);

  return (
    <>
      <TopBoxData />
      <div className="mb-3 defBox">
        <TopTableForm />
        <TableForm />
      </div>
    </>
  );
};

export default InventoryRequestSingle;
