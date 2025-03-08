import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import RecordBtnBox from './RecordBtnBox';
import ShowBox from './ShowBox';
import EditDelRow from './EditDelRow';
import { handleReceiptAndRemittanceArray } from '../../../../../store/storehouse/StorehouseSlice';
import PlaceBox from './PlaceBox';
import ProductSelectBox from './ProductSelectBox';
import AmountInputBox from './AmountInputBox';

const RowBox = ({ item, index }) => {
  const [product, setProduct] = useState();

  const { receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...item,
      productName: item?.product?.name,
      product_id: item?.product?.id,
    });
  }, [item]);

  const onFinish = (values) => {

    const newArrayData = [...receiptAndRemittanceArray];
    newArrayData[index] = {
      ...newArrayData[index], ...values, editable: false, isEmpty: false,
    };
    dispatch(handleReceiptAndRemittanceArray(newArrayData));
  };


  const handleChange = (x, v) => {
    form.setFieldValue('product', v);
    setProduct(v);
  };

  return (<div>
    <Form
      name={index}
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <div className="d-flex align-items-center gap-2  mb-2 rounded-2 border px-2 py-2">
        {item.editable ? <ProductSelectBox form={form} handleChange={handleChange} /> : ''}
        {item.editable ? <AmountInputBox product={product} form={form} item={item} index={index} /> : ''}
        {item.editable ? <PlaceBox form={form} /> : ''}
        {item.editable ? <RecordBtnBox item={item} index={index} /> : ''}
        {!item.editable ? <ShowBox index={index} item={item} /> : ''}
        {!item.editable ? <EditDelRow index={index} /> : ''}
      </div>
    </Form>
  </div>);
};

export default RowBox;




















