import React, { useEffect } from 'react';
import { Form, TreeSelect } from 'antd';
import { useSelector } from 'react-redux';
import useGetPlaceList from '../../../../../api/http_request/Model/storehouse/GetPlaceList3';

const SelectWarehouseFromBox = () => {

  const { placeList, placeListLoading } = useSelector((state) => state.Storehouse);
  const fetchPlaceList = useGetPlaceList();

  useEffect(() => {
    fetchPlaceList();
  }, [fetchPlaceList]);


  return (
    <div className="flex-1">
      <Form.Item  className="mb-0" name="from_storehouse" rules={[{ required: true, message: '' }]}>
        <TreeSelect size="large" placeholder="انبار مبدا"
          // onSelect={handleSelectParent}
          loading={placeListLoading}
          showSearch
          fieldNames={{ label: 'name', value: 'id'  }}
          allowClear
          treeData={placeList}
        />
      </Form.Item>
    </div>
  );
};


export default SelectWarehouseFromBox;