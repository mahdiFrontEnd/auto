import React from 'react';

const ShowBox = ({ index, item }) => {
  console.log(item);
  return (
    <>
      <div className={`flex-1 text-center ${index}`}>{item.product?.name}</div>
      <div className="flex-1 d-flex justify-content-center gap-2">
        <span>{item.amount}</span>
        <span>{item.product?.unit?.unit_value}</span>
      </div>
      <div className="flex-1 text-center">{item.reason}</div>
      {/*<div className="flex-1 text-center">*/}
      {/*{*/}
      {/*  item.place?.map((x,i)=> (*/}
      {/*    <div key={i} className="text-center">{x.name}:{x.amount}</div>*/}
      {/*  ))*/}
      {/*}*/}
      {/*</div>*/}
      {/*<div className="flex-1 text-center">{item.place.name}</div>*/}
    </>
  );
};

export default ShowBox;
