import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import useGetPlaceList from '../../../../../api/http_request/Model/storehouse/GetPlaceList4';
import CustomTree from '../../../../../components/select/CustomTree';

const PlaceBox = (props) => {
  const { placeList, placeListLoading } = useSelector((state) => state.Storehouse);
  const fetchPlaceList = useGetPlaceList();

  useEffect(() => {

    fetchPlaceList();

  }, [fetchPlaceList]);




  const onSelect  = (x, v) => {
    function findPath(tree, targetId, path = []) {
      // eslint-disable-next-line no-restricted-syntax
      for (const node of tree) {
        const newPath = [...path, node.name]; // اضافه کردن نام گره به مسیر

        if (node.id === targetId) {
          return newPath; // اگر گره مورد نظر پیدا شد، مسیر را برگردان
        }

        if (node.children && node.children.length > 0) {
          const result = findPath(node.children, targetId, newPath);
          if (result) return result;
        }
      }
      return null; // اگر مسیر پیدا نشد
    }
    const path = findPath(placeList, x);

    props.form.setFieldValue('place', { ...v,place_full_name: path.join(" / ")});

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
           onSelect ={onSelect }
          treeData={placeList}
        />


      </Form.Item>


    </div>
  );
};

export default PlaceBox;