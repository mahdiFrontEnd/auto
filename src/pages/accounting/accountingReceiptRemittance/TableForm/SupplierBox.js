import React from 'react';
import { Form, Select } from 'antd';

const SupplierBox = ({ item, name, restField }) => {
  console.log(item);
  return (<div className="flex-1 d-flex justify-content-center">
      {item?.product?.suppliers ? <Form.Item restField={{ ...restField }} name={[name, 'supplier_id']}
                                             className="mb-0 flex-1"
                                             rules={[{
                                               required: true, message: '',
                                             }]}>
        <Select allowClear fieldNames={{ label: 'name', value: 'id' }} className="w-100" options={item?.product?.suppliers}
                placeholder="تامین کننده" />
      </Form.Item> : ''}</div>


  );
};

export default SupplierBox;