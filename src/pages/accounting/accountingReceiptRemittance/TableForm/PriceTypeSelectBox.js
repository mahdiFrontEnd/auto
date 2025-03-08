import React from 'react';
import { Form, Select } from 'antd';
import { priceList } from '../../../../helper/jsons/priceList';

const PriceTypeSelectBox = ({name,restField}) => {



  return (<div className="flex-1">


      <Form.Item
        className="mb-0 flex-1"
restField={{ ...restField }}
               name={[name, 'price_type']}

      >
        <Select allowClear placeholder="واحد پول قیمت دوم" options={priceList} className="w-100" />
      </Form.Item>


    </div>);
};

export default PriceTypeSelectBox;