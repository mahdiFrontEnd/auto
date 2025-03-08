import React, { useState } from 'react';
import { Form } from 'antd';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DescriptionBox from './DescriptionBox';
import SubmitBtnBox from './SubmitBtnBox';
import Storehouse from '../../../../../api/http_request/Model/storehouse/Storehouse';
import NewLoading from '../../../../../layouts/loader/NewLoading';

const TopTableForm = () => {
  const navigate = useNavigate();
  const { loading,  address, receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCrud = (values) => {
    const newData = [...receiptAndRemittanceArray]?.filter((item) => !item.isEmpty);


    const transformedData = (data) => {
      const result = [];


      data.forEach(({ product_id, amount, place_id }) => {

        let product = result.find(p => p.product_id === product_id);
        if (!product) {//یعنی از قبل از این محصول نداریم
          product = { product_id, amount: 0, place_id: [] };
          result.push(product);
        }

        product.amount += Number(amount);


        let place = product.place_id.find((p) => p.id === place_id);
        const placeIndex = product.place_id.findIndex((p) => p.id === place_id);


        if (!place) {
          place = { id: place_id, amount: Number(amount) };
          product.place_id.push(place);
        } else {
          product.place_id[placeIndex].amount += Number(amount);
        }

      });

      return result;
    };

    const data = {
      ...values,
      products_data: transformedData(newData),
      in_out: 'in',
      process_id: null,
      type: 'form_in',
      status: 1,
    };
    if (transformedData(newData).length) {
      handleRequest(data);
    } else {
      toast.error('ابتدا باید حداقل یک کالا را انتخاب کنید');
    }
  };
  const handleRequest = (data) => {
    Storehouse.request({
      beforeSend: () => {
        setSubmitLoading(true);
      },
      success: (response) => {
        navigate(-1);

        toast.success(response?.message);
      },
      error: ({ response }) => {
        if (response.status) {
          const errors = [];
          Object.entries(response.data.errors).forEach(([, value]) => {
            errors.push(
              <p key={value}>
                <span>{value}</span>
              </p>,
            );
          });
          toast.error(<div>{errors}</div>);
        }
      },
      final: () => {
        setSubmitLoading(false);
      },
    }).handleRequestWare(address, data);
  };

  return (
    <div className="mb-3">
      {!loading ? (
        <Form
          name="basic"
          form={form}
          layout="vertical"
          initialValues={{ description: '' }}
          onFinish={handleCrud}
        >
          <div className="d-flex align-items-center gap-2  justify-content-between">
            {/*<ReceiptTitleBox />*/}
            <DescriptionBox />
            <SubmitBtnBox loading={SubmitLoading} />
          </div>
        </Form>
      ) : (
        <div style={{ height: '48px' }} className="mb-2 rounded-2 overflow-hidden w-100">
          <NewLoading />
        </div>
      )}
    </div>
  );
};

export default TopTableForm;
