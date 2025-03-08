import React from 'react';
import { getNamesListInParent } from '../../../../helper/getNamesListInParent';

const ShowBoxItem = ({ item }) => {
  console.log(item);

  return (
    <>
      <div className="flex-1 text-center">{item.product.name}</div>
      <div className="flex-1 text-center">{item.amount}{item?.product?.unit?.unit_value}</div>
      <div className="flex-1 text-center">{
        item.place?.map((x, index) => (

          <span key={index}>{getNamesListInParent(x)}</span>
        ))
      }</div>
    </>
  );
};

export default ShowBoxItem;