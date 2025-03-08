import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const ShowBox = ({ index }) => {

  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const { status } = receiptAndRemittanceArray[index];

  return (
    <>


      {!status?.options?.showSelectItem  ?
        <div className={`flex-1 text-center ${index}`}>{receiptAndRemittanceArray[index]?.product?.name}</div> : ''}
      <div className="flex-1 d-flex gap-2 justify-content-center">
        <span>{receiptAndRemittanceArray[index].amount}</span><span>{receiptAndRemittanceArray[index].product?.unit?.unit_value}</span>
      </div>
      <div
        className="flex-1 text-center">{receiptAndRemittanceArray[index]?.dead_time ? dayjs(receiptAndRemittanceArray[index]?.dead_time).format('HH:mm YYYY-MM-DD') : ''}</div>
      <div className="flex-1 text-center ">{receiptAndRemittanceArray[index].reason}</div>

      {/*{(type === 'show') ? <div className="flex-1">{receiptAndRemittanceArray[index]?.status?.persian_title}</div> : ''}*/}


    </>
  );
};

export default ShowBox;