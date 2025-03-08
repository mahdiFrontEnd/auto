import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import useGetPlaceList from '../../../../../api/http_request/Model/storehouse/GetPlaceList2';
import CustomTree from '../../../../../components/select/CustomTree';

const PlaceBox = (props) => {
  const { placeList, placeListLoading } = useSelector((state) => state.Storehouse);
  const fetchPlaceList = useGetPlaceList();

  useEffect(() => {
    fetchPlaceList();
  }, [fetchPlaceList]);




  const onSelect  = (x, v) => {
    console.log(x,v);
    props.form.setFieldValue('place', v);
   };


  return (<div className="flex-1 d-flex gap-2 align-items-center justify-content-center">


      <Form.Item className="d-none"
                 name="place"
      >
        <Input />
      </Form.Item>
      <Form.Item className="mb-0 flex-1"
                 name="place_id"
                 rules={[{ required: true, message: '' }]}
      >


        <CustomTree
          fieldNames={{ label: 'name', key: 'id', value: 'id' }}
          placeholder="نام انبار"
          loading={placeListLoading}
          allowClear
           onSelect ={onSelect}
          treeData={placeList}
        />


      </Form.Item>


    </div>
  );
};

export default PlaceBox;