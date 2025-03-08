import React from 'react';
import { useSelector } from 'react-redux';
import HeadersBox from './HeadersBox';
import RowBox from './RowBox';

const TableForm = () => {
  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  return (
    <div className="" style={{overflow:"auto"}}>
      <div className="" style={{minWidth:"800px"}}>
      <HeadersBox />
      {receiptAndRemittanceArray.map((item, index) => (
        <RowBox item={item} index={index} />
      ))}
    </div>  </div>
  );
};

export default TableForm;
