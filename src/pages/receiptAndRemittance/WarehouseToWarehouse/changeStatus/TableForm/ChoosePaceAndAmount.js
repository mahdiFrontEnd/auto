import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';

const ChoosePaceAndAmount = ({ form, name, index, restField }) => {
  const { receiptAndRemittanceArray, } = useSelector((state) => state.Storehouse);
  const { detail_places } = receiptAndRemittanceArray[index];
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const resultArray = [];

    function traverse(category, subCategory, children) {
      if (!children) return;

      children.forEach(child => {
        if (child.is_partition === 1) {
          resultArray.push({
            amount: 0,
            name: `${category} - ${subCategory} - ${child.name}`,
            id: child.id,
          });

        } else if (child.children) {
          traverse(category, child.name, child.children);
        }
      });
    }

    detail_places.forEach(mainCategory => {
      mainCategory.children.forEach(subCategory => {
        traverse(mainCategory.name, subCategory.name, subCategory.children);
      });
    });
    setDataArray(resultArray);

  }, [detail_places]);


  const handleChangeValue = (value, i) => {
    const newArray = [...dataArray];
    newArray[i] = { ...newArray[i], amount: value === '' ? 0 : Number(value) };
    const newData = newArray?.filter(item => item.amount > 0);
    const products = form.getFieldValue('products') || [];
    products[index] = { ...products[index], place_id: newData, };
    form.setFieldsValue({ products });
    setDataArray(newArray);
  };
  return (
    <div className="flex-1 overflow-hidden">
        {dataArray.map((item, i) => (
          <Form.Item
            className="mb-0 flex-1"
            {...restField}
            name={name}
            // rules={[{ required: true, message: '' }]}
          >
          <div key={i} className="my-1">
            <Input placeholder={item.name} onChange={(e) => {
              handleChangeValue(e?.target?.value, i);
            }} value={item.amount || null} type="number" />
          </div>  </Form.Item>
        ))}
    </div>
  );
};


export default ChoosePaceAndAmount;
