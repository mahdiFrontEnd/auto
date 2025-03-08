import React from 'react';
import { Checkbox, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { handleSelectedItem } from '../../../../../store/storehouse/StorehouseSlice';

const SelectItem = ({ item, restField, name }) => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.Storehouse);

  const handleChange = (e) => {


    let items = [...selectedItem];
    if (e.target.checked) {
      items.push(item.id);
    } else {
      items = items?.filter(x => x !== item.id )
    }
    dispatch(handleSelectedItem([...items]));
  };
  return (
    <div className="flex-1 d-flex justify-content-center">

      <Form.Item className="mb-0 flex-1" valuePropName="checked"
                 {...restField}
                 name={name}>
        <Checkbox onChange={handleChange}>{item.product.name}</Checkbox>
      </Form.Item>
    </div>


  );
};

export default SelectItem;


