import React from 'react';
import { Form, Input } from 'antd';

const DescriptionBox = () => {
  return (
    <div className="flex-1">
      <Form.Item className="mb-0" name="description">
        <Input size="large" placeholder="توضیحات" className="w-100" />
      </Form.Item>
    </div>
  );
};

export default DescriptionBox;
