import React, { useEffect, useState } from 'react';

import { Button, Form, InputNumber, Modal, Select } from 'antd';
import { LuPlus } from 'react-icons/lu';
import { Edit2 } from 'iconsax-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import { priceList } from '../../../helper/jsons/priceList';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Storehouse from '../../../api/http_request/Model/storehouse/Storehouse';

const AccountingReceiptRemittanceUpdate = ({ rowData }) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  console.log(rowData);
  useEffect(() => {
    if (rowData && open) {

      form.setFieldsValue(rowData.detail_Product);

    }
    setError422([]);
  }, [rowData, open]);

  const showModal = () => {
    form.resetFields();
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log(values);
    values = {
      ...values, 'expire_date': null,
      'batch_number': null,
    };
    Storehouse.request({
      beforeSend: () => {
      },
      success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);

        dispatch(getAgainHandler());
      },
      error: (response) => {
        if (response?.response?.status === 422) {
          setError422(response.response?.data?.errors);
        } else {
          toast.error(response?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
    }).AccountingStorehouseUpdate(values, rowData?.id);

  };

  const onFinishFailed = () => {
  };


  return (
    <>

      <IconBtn
        TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
        btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
        icon={rowData ? <Edit2 variant="Bold" size={22} /> : <LuPlus size={22} />}
        onClick={showModal}
      />


      <Modal
        width={1000}
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  کاربر `}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            انصراف
          </Button>,
          <Button

            key="submit"
            className="defBtn orangeBtn px-4"
            loading={loading}
            onClick={() => {
              form.submit();
            }}
          >
            ثبت
          </Button>,


        ]}
      >
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={rowData || { sections: [{}] }}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">

            <div className="col-md-6 col-lg-4">
              <Form.Item
                label=" قیمت (ریال)"
                name="price_irr"
                rules={[
                  {
                    required: true,
                    message: 'لطفا قیمت را وارد کنید!',
                  },
                ]}
                validateStatus={error422.price_irr ? 'error' : 'success'}
                help={error422.price_irr}
              >
                <InputNumber className="w-100" controls={false}
                             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                             parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="واحد پول قیمت دوم"
                name="price_type"

                validateStatus={error422.price_type ? 'error' : 'success'}
                help={error422.price_type}
              >
                <Select allowClear options={priceList} />
              </Form.Item>
            </div>
            <div className="col-md-6 col-lg-4">
              <Form.Item
                label="قیمت دوم"
                name="price"

                validateStatus={error422.price ? 'error' : 'success'}
                help={error422.price}
              >
                <InputNumber allowClear className="w-100" controls={false}
                             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                             parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </div>
            {rowData.product?.suppliers?.length ? <div className="col-md-6 col-lg-4">
              <Form.Item
                label="تامین کننده"
                name="supplier_id"
                rules={[
                  {
                    required: true,
                    message: 'لطفا تامین کننده را وارد کنید!',
                  },
                ]}
                validateStatus={error422.supplier_id ? 'error' : 'success'}
                help={error422.supplier_id}
              >
                <Select options={rowData.product?.suppliers} fieldNames={{ label: 'name', value: 'id' }} />
              </Form.Item>
            </div> : ''}


          </div>
        </Form>
      </Modal>
    </>
  );
};


export default AccountingReceiptRemittanceUpdate;