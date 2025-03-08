import React from 'react';
import { Form, Input } from 'antd';

const ReasonInputBox = () => {

  return (

    <div className="flex-1 d-flex justify-content-center">

        <Form.Item className="mb-0 flex-1"
                   name="reason"
                   rules={[{ required: true, message: '' }]}
        ><Input placeholder="دلیل درخواست"
                className="w-100" /></Form.Item> </div>


  );

};

export default ReasonInputBox;