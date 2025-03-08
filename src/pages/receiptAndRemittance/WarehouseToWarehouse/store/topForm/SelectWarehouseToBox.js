import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import GetStorehouseList from '../../../../../api/http_request/Model/storehouse/GetPlaceList';

const SelectWarehouseToBox = () => {

  const [placeList, setPlaceList] = useState([]);
  const [placeListLoading, setPlaceListLoading] = useState(false);

  useEffect(() => {
    GetStorehouseList(setPlaceList, setPlaceListLoading);
  }, []);

  return (
    <div className="flex-1">
      <Form.Item className="mb-0" name="to_storehouse" rules={[{ required: true, message: '' }]}>
        <Select size="large" placeholder="انبار مقصد"

                loading={placeListLoading}
                showSearch
                fieldNames={{ label: 'name', value: 'id' }}
                allowClear
                options={placeList}
        />
      </Form.Item>
    </div>
  );
};


export default SelectWarehouseToBox;