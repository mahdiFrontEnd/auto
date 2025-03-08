import React from 'react';
import { Form, Input } from 'antd';

const ReceiptTitleBox = () => {
  return (
    <div className="flex-1">
      <Form.Item className="mb-0" name="request_name" rules={[{ required: true, message: '' }]}>
        <Input size="large" placeholder="عنوان درخواست" className="w-100" />
      </Form.Item>
    </div>
  );
};

export default ReceiptTitleBox;
