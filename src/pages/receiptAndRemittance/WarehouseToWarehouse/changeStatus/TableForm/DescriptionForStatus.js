import React from 'react';
import { Form, Input } from 'antd';

const DescriptionForStatus = ({ restField, name }) => {

  return (

    <div className="flex-1 d-flex justify-content-center">
      <Form.Item className="mb-0 flex-1"
                 {...restField}
                 name={name}

      >
        <Input
               placeholder="توضیحات"
               className="w-100" />
      </Form.Item>

    </div>
  );
};

export default DescriptionForStatus;

