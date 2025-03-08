import React from 'react';
import { useSelector } from 'react-redux';

const CreatedBy = () => {
  const { receiptAndRemittanceData } = useSelector((state) => state.Storehouse);
  return (
    <>
      {receiptAndRemittanceData?.create_by ? (
        <div className=" gap-2  keyValue mb-4">
          <span className="key">درخواست دهنده:</span>
          <span className="value">{`${receiptAndRemittanceData?.create_by?.first_name} ${receiptAndRemittanceData?.create_by?.last_name}`}</span>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CreatedBy;
