import React from 'react';
import dayjs from 'dayjs';

const ShowBox = ({ index, item }) => {
  return (
    <>
      <div className={`flex-1 text-center ${index}`}>{item?.product.name}</div>
      <div className="flex-1 d-flex gap-2 justify-content-center">
        <span>{item.amount}</span>
        <span>{item.product.unit?.unit_value}</span>
      </div>
      <div className="flex-1 text-center">
        {item?.dead_time ? dayjs(item?.dead_time).format('HH:mm YYYY-MM-DD') : ''}
      </div>
      <div className="flex-1 text-center">{item.reason}</div>

      <div className="flex-1 text-center">{item?.status?.persian_title}</div>
    </>
  );
};

export default ShowBox;
