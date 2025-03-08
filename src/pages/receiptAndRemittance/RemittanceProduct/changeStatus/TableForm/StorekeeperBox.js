import React from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';

const StorekeeperBox = ({ restField, index,name3, name2, name1, form}) => {
  const { storekeeperList = [] } = useSelector((state) => state.Storehouse);
  const handleChange = (value) => {
    if (value) {
      const updatedUsers = [...(form.getFieldValue('products') || [])];
      updatedUsers[index] = {
        ...updatedUsers[index],
        storekeeper_id: value.position_id,
        storekeeper_user_id: value.user_id,
        // status_id: item.next_statuses[0]?.id,
      };
      form.setFieldsValue({ products: updatedUsers });
    }
  };

  return (
    <div className="flex-1 overflow-hidden d-flex justify-content-center">
      <div className="d-none">
        <Form.Item {...restField} name={name1}>
          <Input />
        </Form.Item>
        <Form.Item {...restField} name={name2}>
          <Input />
        </Form.Item>

      </div>

      <Form.Item
        className="mb-0 flex-1"
        {...restField}
        name={name3}
        rules={[{ required: true, message: '' }]}
      >
        <Select
          allowClear
          placeholder="انباردار"
          dropdownStyle={{ width: '250px' }}
          onChange={(value, option) => handleChange(option)}
          className="w-100"
          options={storekeeperList}
        />
      </Form.Item>
    </div>
  );
};

export default StorekeeperBox;
