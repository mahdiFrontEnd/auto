import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import useGetPlaceList from '../../../../../api/http_request/Model/storehouse/GetPlaceList2';

const ChoosePaceAndAmount = ({ form }) => {

  const [dataArray, setDataArray] = useState([]);

  const { placeList } = useSelector((state) => state.Storehouse);
  const fetchPlaceList = useGetPlaceList();

  useEffect(() => {
    fetchPlaceList();
  }, [fetchPlaceList]);




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

    placeList.forEach(mainCategory => {
      mainCategory.children.forEach(subCategory => {
        traverse(mainCategory.name, subCategory.name, subCategory.children);
      });
    });
    setDataArray(resultArray);

  }, [placeList]);


  const handleChangeValue = (value, i) => {
    const newArray = [...dataArray];
    newArray[i] = { ...newArray[i], amount: value === '' ? 0 : Number(value) };
    const newData = newArray?.filter(item => item.amount > 0);
    form.setFieldValue('place',newData);
    setDataArray(newArray);
  };


  return (
    <div className="flex-1 overflow-hidden">
        {dataArray.map((item, i) => (
          <Form.Item className="mb-0 flex-1" name="place">
          <div key={i} className="mb-1">
            <Input placeholder={item?.name} onChange={(e) => {
              handleChangeValue(e?.target?.value, i);
            }} value={item.amount || null} type="number" />
          </div>  </Form.Item>
        ))}
    </div>
  );
};


export default ChoosePaceAndAmount;
