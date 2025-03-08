import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  defReceiptAndRemittance,
  handleAddress,
  handleReceiptAndRemittanceArray,
} from '../../../../store/storehouse/StorehouseSlice';
import TopTableForm from './topForm/TopTableForm';
import TableForm from './TableForm/TableForm';
import TitleBox from '../../../../components/TitleBox';

const StoreReceiptProduct = (props) => {
  const dispatch = useDispatch();
  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  useEffect(() => {
     dispatch(handleAddress(props.address));
  }, [ props.address]);

  useEffect(() => {
    let needToAddRow = true;
    receiptAndRemittanceArray.forEach((item) => {
      if (item.editable) {
        needToAddRow = false;
      }
    });

    if (needToAddRow) {
      dispatch(
        handleReceiptAndRemittanceArray([...receiptAndRemittanceArray, defReceiptAndRemittance]),
      );
    }
  }, [receiptAndRemittanceArray]);

  return (
    <>
      <TitleBox title={props.title}></TitleBox>

      <div className="mb-3 defBox">
        <TopTableForm  />
        <TableForm />
      </div>
    </>
  );
};

export default StoreReceiptProduct;

// process/form/list_product
