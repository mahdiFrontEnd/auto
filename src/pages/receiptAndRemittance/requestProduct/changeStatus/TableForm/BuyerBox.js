import React from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';

const BuyerBox = ({ restField, form, name1, name2, name3, index }) => {
  const { buyerList } = useSelector((state) => state.Storehouse);

  const handleChange = (value) => {
    if (value) {
      const products = form.getFieldValue('products') || [];
      products[index] = { ...products[index],
        buyer_id: value.position_id,
        buyer_user_id: value.user_id };
      form.setFieldsValue({ products });
    }
  };

  return (
    <div className="flex-1 overflow-hidden d-flex justify-content-center">
      <Form.Item className="d-none" {...restField} name={name1}>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item className="d-none" {...restField} name={name2}>
        <Input type="hidden" />
      </Form.Item>

      <Form.Item
        className="mb-0 flex-1"
        {...restField}
        name={name3}
        rules={[{ required: true, message: '' }]}
      >
        <Select
          allowClear
          placeholder="خریدار"
          dropdownStyle={{ width: '250px' }}
          onChange={(e, v) => {
            handleChange(v);
          }}
          // className="w-100"
          options={buyerList}
        />
      </Form.Item>
    </div>
  );
};

export default BuyerBox;
