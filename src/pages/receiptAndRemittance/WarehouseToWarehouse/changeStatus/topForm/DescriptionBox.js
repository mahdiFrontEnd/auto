import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';


const DescriptionBox = () => {
  const {  receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const status = receiptAndRemittanceArray[0]?.status;

  const showJson = status?.options || {};
  return (
    <div className="flex-1">
      {(showJson.mainDescription) ?
        <Form.Item className="mb-0"
                   name="description"
        ><Input size="large" placeholder="توضیحات"
                className="w-100" /></Form.Item> :""
      }</div>
  );
};

export default DescriptionBox;