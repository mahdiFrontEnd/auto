import React, { useState } from 'react';
import { Form } from 'antd';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DescriptionBox from './DescriptionBox';
import RequestTitleBox from './RequestTitleBox';
import SubmitBtnBox from './SubmitBtnBox';
import Storehouse from '../../../../../api/http_request/Model/storehouse/Storehouse';
import NewLoading from '../../../../../layouts/loader/NewLoading';
import SelectWarehouseFromBox from './SelectWarehouseFromBox';
import SelectWarehouseToBox from './SelectWarehouseToBox';

const TopTableForm = () => {
  const navigate = useNavigate();
  const { loading,  address, receiptAndRemittanceArray } = useSelector((state) => state.Storehouse);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCrud = (values) => {
    const newData = [...receiptAndRemittanceArray]?.filter((item) => !item.isEmpty);

    const res = newData.map(({ reason, product_id, amount }) => {
      return { reason, product_id, amount,from_storehouse:values.from_storehouse ,to_storehouse:values.to_storehouse };
    });
    const data = {
      ...values,
      products: res,
  };

    // const x ={
    //   "request_name": "بیلب",
    //   "description": "sdfsdfsdfsdfzsdfsadfsdfdsf",
    //   "from_storehouse": 2,
    //   "to_storehouse": 1,
    //   "products": [
    //     {
    //       "from_storehouse": 2,
    //       "to_storehouse": 1,
    //       "product_id": 2,
    //       "amount": 150,
    //       "reason": "example"
    //     }
    //   ]
    // }




    if (res.length) {
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
            <RequestTitleBox />
            <SelectWarehouseFromBox />
            <SelectWarehouseToBox />
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
