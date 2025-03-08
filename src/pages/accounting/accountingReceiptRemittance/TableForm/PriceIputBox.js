import React from 'react';
import { Form, InputNumber } from 'antd';

const PriceInputBox = ({ name, restField }) => {

  return (<div className="flex-1 d-flex justify-content-center">

    <Form.Item restField={{ ...restField }} name={[name, 'price']} className="mb-0 flex-1"
               >

      <InputNumber placeholder="قیمت دوم" className="w-100" controls={false}
                   formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                   parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
      />

    </Form.Item></div>);
};

export default PriceInputBox;