import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Modal, Switch } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LuPlus } from 'react-icons/lu';
import { Edit2 } from 'iconsax-react';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Products from '../../../api/http_request/Model/products/Products';

const UpdateCreateTypes = ({ rowData }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);


  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue({ ...rowData, description: rowData.description ?? '' });
    } else if (!rowData) {
      form.resetFields();
    }
    setError422([]);

  }, [rowData, open]);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);

  };
  const onFinish = (values) => {
    setError422([]);
    setLoading(true);

    values.status = values.status ? 1 : 0;
    Products.request({
      beforeSend: () => {
      }, success: (res) => {

        handleCancel();
        toast.success(res.message);
        dispatch(getAgainHandler());


      }, error: (error) => {
        if (error?.response?.status === 422) {
          setError422(error?.response?.data?.errors);
        } else {
          toast.error(error?.message);
        }

      }, final: () => {
        setLoading(false);
      },
    }).createEditProductTypes(values, 'post', rowData?.id);


  };
  const onFinishFailed = () => {
  };

  return (<>
      {hasPermission('storehouse_type', ['create']) && (
        <IconBtn TooltipText={rowData ? 'ویرایش' : 'ایجاد'} btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
                 icon={rowData ? <Edit2 variant="Bold" size={22} /> : <LuPlus size={22} />}
                 onClick={showModal} />)}


      <Modal
        width={900}
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  نوع محصول `}
        onCancel={handleCancel}
        // footer={[<Button key="back" onClick={handleCancel}>
        //   انصراف
        // </Button>, <Button key="submit" className="defBtn orangeBtn px-4" loading={loading} onClick={() => {
        //   form.submit();
        // }}>
        //   ثبت
        // </Button>,
        //
        // ]}
      >
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={rowData || { status: 1 }}
          onFinishFailed={onFinishFailed}
        >

          <div className="row">

            <div className="col-md-6 "><Form.Item
              label="نام"
              name="name"
              validateStatus={error422.name_fa ? 'error' : 'success'}
              help={error422.name_fa}
              rules={[{ required: true, message: 'لطفا نام   را وارد کنید!' }]}
            >
              <Input />

            </Form.Item>
              {/*<Form.Item*/}
              {/*  label="نام انگلیسی"*/}
              {/*  name="english_name"*/}
              {/*  validateStatus={error422?.name ? 'error' : 'success'}*/}
              {/*  help={error422?.name}*/}
              {/*  rules={[{*/}
              {/*    required: true, message: 'لطفا نام انگلیسی را وارد کنید!',*/}
              {/*  }]}*/}
              {/*>*/}
              {/*  <Input />*/}

              {/*</Form.Item>*/}
            </div>

            <div className="col-md-6 ">
              <Form.Item
                validateStatus={error422.status ? 'error' : 'success'}
                help={error422.status}
                label="وضعیت"
                name="status"
                valuePropName="checked"
              >

                <Switch checkedChildren="فعال" unCheckedChildren="غیر فعال" />

              </Form.Item>

            </div>

            <div className="col-md-6 "><Form.Item
              label="توضیحات"
              name="description"
            >
              <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />

            </Form.Item>
            </div>

            <div className="d-flex justify-content-end gap-2">

              <Button key="back" onClick={handleCancel}>
                انصراف
              </Button>
              <Form.Item>
                <Button className="defBtn orangeBtn px-4" key="submit" loading={loading} onClick={() => {
                  form.submit();
                }}>
                  ثبت
                </Button></Form.Item>

            </div>
          </div>

        </Form>

      </Modal>


    </>

  );
};

export default UpdateCreateTypes;
