import React from 'react';
import { Form, Input } from 'antd';

const AmountInputBox = (props) => {



  return (<div className="flex-1 d-flex justify-content-center">

      <Form.Item className="mb-0 flex-1" name="amount"
                 rules={[{ required: true, message: '' }]}>
        <Input type="number" addonAfter={props.product?.unit?.unit_value} placeholder="مقدار"
               className="w-100" />
      </Form.Item>  </div>);
};

export default AmountInputBox;