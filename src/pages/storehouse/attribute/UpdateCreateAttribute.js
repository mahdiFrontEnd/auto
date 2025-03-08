import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { LuPlus } from 'react-icons/lu';
import { Edit2 } from 'iconsax-react';
import { hasPermission } from '../../../permission/module';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import Products from '../../../api/http_request/Model/products/Products';

const UpdateCreateAttribute = ({ rowData }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error422, setError422] = useState([]);

  useEffect(() => {
    if (rowData && open) {
      form.setFieldsValue({
        ...rowData, description: rowData.description ?? '',
        values: rowData.values.map(({ value }) => (value)),
      });
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
      },
      success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);
        dispatch(getAgainHandler());
      },
      error: (error) => {
        if (error?.response?.status === 422) {
          setError422(error?.response?.data?.errors);
        } else {
          toast.error(error?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
    }).updateCreateAttribute(values, rowData?.id);
  };

  const onFinishFailed = () => {
  };

  return (
    <>
      {hasPermission('storehouse_type', ['create']) && (
        <IconBtn
          TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
          btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
          icon={rowData ? <Edit2 variant="Bold" size={22} /> : <LuPlus size={22} />}
          onClick={showModal}
        />
      )}

      <Modal
        width={900}
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  ویژگی `}
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
          // initialValues={{ ...rowData, status: rowData?.status || 1 }}
          initialValues={{ ...rowData, description: rowData?.description || '', status: rowData?.status || 1 }}


          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-md-6 ">
              <Form.Item
                label="نام  "
                name="name"
                validateStatus={error422.name ? 'error' : 'success'}
                help={error422.name}
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام فارسی را وارد کنید!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="مقادیر"
                name="values"
                validateStatus={error422.values ? 'error' : 'success'}
                help={error422.values}
                rules={[
                  {
                    required: true,
                    message: 'لطفا مقادیر را وارد کنید!',
                  },
                ]}
              >
                <Select mode="tags" />
              </Form.Item>
            </div>
            <div className="col-md-6   ">
              <Form.Item name="description" label="توضیحات">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
              </Form.Item>
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
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateAttribute;
