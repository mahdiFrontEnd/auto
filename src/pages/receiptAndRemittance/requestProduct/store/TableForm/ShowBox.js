import React from 'react';
import dayjs from 'dayjs';

const ShowBox = ({ index, item }) => {
  return (
    <>
      <div className={`flex-1 text-center ${index}`}>{item.product?.name}</div>
      <div className="flex-1 d-flex justify-content-center gap-2">
        <span>{item.amount}</span>
        <span>{item.product?.unit?.unit_value}</span>
      </div>
      <div className="flex-1 text-center">
        {item.dead_time ? dayjs(item.dead_time).format('HH:mm YYYY-MM-DD') : ''}
      </div>
      <div className="flex-1 text-center">{item.reason}</div>
    </>
  );
};

export default ShowBox;
