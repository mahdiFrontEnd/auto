import React from 'react';
import { Form, InputNumber } from 'antd';

const PriceIrrInputBox = ({ name, restField }) => {

  return (<div className="flex-1 d-flex justify-content-center">

    <Form.Item restField={{ ...restField }}
               name={[name, 'price_irr']} className="mb-0 flex-1"
               rules={[{ required: true, message: '' }]}>


      <InputNumber placeholder="قیمت (ریال)" className="w-100" controls={false}
                   formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                   parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
      />


    </Form.Item></div>);
};

export default PriceIrrInputBox;