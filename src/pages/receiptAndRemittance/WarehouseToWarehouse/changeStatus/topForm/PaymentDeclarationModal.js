import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as IBAN from 'iban';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Storehouse from '../../../../../api/http_request/Model/storehouse/Storehouse';
import CurrencyInputComponent from '../../../../../components/MicroComponents/CurrencyInputComponent';
import { paymentTypes } from '../../../../../helper/jsons/paymentTypes';
import { checkCodeMeli } from '../../../../../helper/CheckCodeMeli';
import CkEditorComponent from '../../../../../components/MicroComponents/ckEditor/CKEditorComponent';
import Uploader from '../../../../../components/MicroComponents/Uploader';


const PaymentDeclarationModal = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { selectedItem } = useSelector((state) => state.Storehouse);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [error422, setError422] = useState([]);
  const [payType, setPayType] = useState('cash');
  const [destinationType, setDestinationType] = useState(false);

  const showModal = () => {
    if(selectedItem.length){
      setOpen(true);

    }else {
      toast.error("لطفا ابتدا کالاهای مدنظر خود را انتخاب کنید");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {


    values.target_type = values.target_type ? 1 : 2;
    values.request_product_ids = selectedItem;
    setError422([]);
    values.attachments = attachments;


    setLoading(true);
    Storehouse.request({
      beforeSend: () => {
      }, success: (res) => {
        navigate(-1);
        handleCancel();
        form.resetFields();
        toast.success(res.message);
      }, error: (response) => {
        if (response?.response?.status === 422) {
          setError422(response.response?.data?.errors);
        } else {
          toast.error(response?.message);
        }
      }, final: () => {
        setLoading(false);
      },
    }).paymentDeclaration(values);
  };
  return (<>



    <Button variant="solid"  onClick={showModal} className="defBtn bgGreenBtn"
            style={{ padding: '18px 30px' }}  >
      ثبت اعلامیه پرداخت
    </Button>



    <Modal
      open={open}
      title="اضافه کردن اعلامیه پرداخت"
      onCancel={handleCancel}
      width="1200px"
      footer={[

        <Button key="back" onClick={handleCancel}>
          انصراف
        </Button>, <Button className="defBtn orangeBtn px-4" key="submit" loading={loading} onClick={() => {
          form.submit();
        }}>
          ثبت
        </Button>,

      ]}
    >
      <Form
        layout="vertical"
        name="basic"
        form={form}
        initialValues={{ no_salary: false, target_type: false, pay_type: 'cash' }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item
              label="موضوع"
              name="subject"
              validateStatus={error422.subject ? 'error' : 'success'}
              help={error422.subject}
              rules={[{ required: true, message: 'لطفا  موضوع را وارد کنید!' }]}
            >
              <Input />
            </Form.Item>
          </div>


          <div className="col-md-6">
            <Form.Item
              validateStatus={error422.price ? 'error' : 'success'}
              help={error422.price}
              label="مبلغ"
              name="price"
              rules={[{
                required: true, message: 'لطفا  مبلغ را وارد کنید!',
              }]}
            >
              <CurrencyInputComponent
                onChange={(e) => {
                  form.setFieldValue('price', e);
                }}
                value={form.getFieldValue('price')}
              />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <div className="d-flex gap-3">
              <Form.Item
                label="نوع پرداخت"
                name="pay_type"
              >
                <Select onChange={(e) => {
                  setPayType(e);
                  form.setFieldValue('pay_type', e);
                }}
                        options={paymentTypes}
                />
              </Form.Item>

              <Form.Item className="flex-1"
                         validateStatus={error422.pay_to ? 'error' : 'success'}
                         help={error422.pay_to}
                         label="در وجه"
                         name="pay_to"
                         rules={[{
                           required: true, message: 'لطفا  در وجه را وارد کنید!',
                         }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>


          <div className="col-md-6">
            {
              payType === 'cash' ?


                <Form.Item
                  validateStatus={error422?.sheba ? 'error' : 'success'}
                  help={error422?.sheba}
                  label="شماره شبا"
                  name="sheba"
                  rules={[{
                    required: true, message: 'لطفا  شماره شبا را وارد کنید!',
                  }, () => ({
                    validator(x, value) {

                      if (IBAN.isValid(`IR${value}`)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('لطفا شماره شبا را درست وارد کنید!'));
                    },
                  }),


                  ]}
                >
                  <Input maxLength={24} className="text-start ltr" addonBefore="IR" />
                </Form.Item> : payType === 'cheque' ? <div className="d-flex gap-3">


                  <Form.Item valuePropName="checked"
                             name="target_type"
                             label="نوع مقصد"

                  > <Switch onChange={(e) => {
                    setDestinationType(e);
                    form.setFieldValue('target_type', e);
                  }} className="w-100" style={{ maxWidth: '100px' }}
                            checkedChildren="حقیقی"
                            unCheckedChildren="حقوقی" /></Form.Item>
                  <Form.Item className="flex-1"
                             validateStatus={error422.id_number ? 'error' : 'success'}
                             help={error422.id_number}
                             label={destinationType ? 'کد ملی' : 'شناسه ملی'}
                             name="id_number"
                             maxLength={destinationType ? 10 : 20}
                             rules={[{
                               required: true, message: 'لطفا شناسه ملی / کد ملی را وارد کنید!',
                             }, () => ({
                               validator(x, value) {
                                 if (checkCodeMeli(value) || !destinationType) {
                                   return Promise.resolve();
                                 }
                                 return Promise.reject(new Error('لطفا کد ملی را درست وارد کنید!'));
                               },
                             })]}
                  >
                    <Input />
                  </Form.Item></div> : ''
            }

          </div>


          <div className="col-md-12">
            <Form.Item
              validateStatus={error422.body ? 'error' : 'success'}
              help={error422.body}
              label="متن"
              name="body"
              rules={[{
                required: true,
                message: 'لطفا متن را وارد کنید!',
              }]}
            >
              <CkEditorComponent getData={(e) => form.setFieldValue('body', e)} />
              {/*<Input.TextArea />*/}
            </Form.Item>
          </div>


          <Form.Item
            validateStatus={error422.attachments ? 'error' : 'success'}
            help={error422.attachments}
            name="attachments"
            label="فایل"
            rules={[{
              required: true,
              message: 'لطفا فایل را وارد کنید!',
            }]}
          >
            <Uploader
              onChangeImage={(e) => {
                setAttachments(e);
                form.setFieldValue('attachments', e);
              }}
            />
          </Form.Item>

        </div>
      </Form>
    </Modal>
  </>);
};

export default PaymentDeclarationModal;

