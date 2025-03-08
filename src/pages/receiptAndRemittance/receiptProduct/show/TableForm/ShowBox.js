import React from 'react';
import { getNamesListInParent } from '../../../../../helper/getNamesListInParent';

const ShowBox = ({ index, item }) => {

  return (
    <>
      <div className={`flex-1 text-center ${index}`}>{item?.product?.name}</div>
      <div className="flex-1 d-flex gap-2 justify-content-center">
        <span>{item.amount}</span>
        <span>{item.product?.unit?.unit_value}</span>
      </div>

      <div className="flex-1 text-center">{item?.place.map((x) => {
       return getNamesListInParent(x);
      })}</div>
    </>
  );
};

export default ShowBox;
