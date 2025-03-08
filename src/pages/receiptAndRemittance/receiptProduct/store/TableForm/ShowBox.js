import React from 'react';

const ShowBox = ({ item }) => {
  console.log(item);
  return (
    <>
      <div className="flex-1 text-center">{item.product?.name}</div>
      <div className="flex-1 d-flex justify-content-center gap-2">
        <span>{item.amount}</span>
        <span>{item.product?.unit?.unit_value}</span>
      </div>
      <div className="flex-1 text-center">{item.place.place_full_name}</div>
    </>
  );
};

export default ShowBox;
