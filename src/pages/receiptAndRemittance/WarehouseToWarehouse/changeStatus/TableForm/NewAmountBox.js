import React from 'react';
import { Form, Input } from 'antd';

const NewAmountBox = ({ restField, name,initialValues ,index}) => {
  return (

    <div className="flex-1 amountForStatus d-flex justify-content-center">
      <Form.Item className="mb-0 flex-1"
                 {...restField}
                 name={name}

      >
        <Input disabled={initialValues[index].in_store !== 1}
          placeholder="مقدار جدید"
          className="w-100" />
      </Form.Item>

    </div>
  );
};

export default NewAmountBox;

