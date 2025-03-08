import React from 'react';
import PriceTypeSelectBox from './PriceTypeSelectBox';
import PriceIrrInputBox from './PriceIrrInputBox';
import ShowBoxItem from './ShowBoxItem';
import PriceInputBox from './PriceIputBox';
import SupplierBox from './SupplierBox';

const RowBox = ({ item , index ,name,restField}) => {

  return (<div key={index} className="d-flex align-items-center bg-white gap-2  mb-2 rounded-2 border px-2 py-2 ">
    <ShowBoxItem item={item} />
    <PriceIrrInputBox name={name} restField={restField}/>
    <PriceTypeSelectBox name={name} restField={restField}/>
    <PriceInputBox name={name} restField={restField}/>
    <SupplierBox item={item} name={name} restField={restField}/>
  </div>);
};

export default RowBox;




















