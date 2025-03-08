import React from 'react';
import { useSelector } from 'react-redux';
import ShowBox from './ShowBox';

const ChangeStatusBox = () => {
  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  return (
    <div>
      {receiptAndRemittanceArray.map((item, index) => (
        <div
          className="d-flex align-items-center gap-2  mb-2 rounded-2 border px-2 py-2 "
          key={index}
        >
          <ShowBox index={index} item={item} />
          {/*<ShowProcessNew data={item} TooltipText="نمایش فرایند انجام شده" />*/}
        </div>
      ))}
    </div>
  );
};

export default ChangeStatusBox;
