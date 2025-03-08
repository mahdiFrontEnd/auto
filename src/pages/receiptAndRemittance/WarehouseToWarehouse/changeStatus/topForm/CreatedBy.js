import React from 'react';
import { useSelector } from 'react-redux';

const CreatedBy = () => {
  const { receiptAndRemittanceData } = useSelector((state) => state.Storehouse);
  return (
    <>
      {receiptAndRemittanceData?.user ? (
        <div className=" gap-2  keyValue mb-4">
          <span className="key">درخواست دهنده:</span>
          <span className="value">{`${receiptAndRemittanceData?.user?.first_name} ${receiptAndRemittanceData?.user?.last_name}`}</span>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CreatedBy;
