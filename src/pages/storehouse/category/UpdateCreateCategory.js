import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal, Switch, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { LuPlus } from 'react-icons/lu';
import { Edit2 } from 'iconsax-react';
import GetCategoryList from '../../../api/http_request/Model/products/GetCategoriesList';
import Products from '../../../api/http_request/Model/products/Products';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import CodeBox from './CodeBox';
import { hasPermission } from '../../../permission/module';
import { findItemById } from '../../../helper/findItemById';
// import UploadByForm from '../../../components/MicroComponents/UploadByForm';


const UpdateCreateCategory = ({ rowData }) => {
  const dispatch = useDispatch();
  const [error422, setError422] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState([]);
  const [parentCompleteCode, setParentCompleteCode] = useState('');
  const [code, setCode] = useState('');
  useEffect(() => {
    if (rowData) {
      console.log(2345);
      form.setFieldsValue({
        ...rowData,
        parent_id: rowData.parent_id ?? 'null',
        description: rowData.description ?? '',
      });
      setParentCompleteCode(rowData?.complete_code?.slice(0, -2));
      setCode(rowData.code);
    }
  }, [JSON.stringify(rowData),open]);


  const handleChange = (value) => {
    const item = findItemById(categoryList, value, 'children_category');
    setParentCompleteCode(item.complete_code);


  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setParentCompleteCode('');
    setCode('');

  };

  useEffect(() => {
    if (open) {
      GetCategoryList((e) => {
        setCategoryList([{ name: 'سر دسته ندارد', id: 'null' }, ...e]);
      }, setCategoryLoading, { skip: 0, take: 5000 });
      setError422([]);
    }
  }, [open]);

  const onFinish = (values) => {

    setError422([]);
    values.status = values.status ? 1 : 0;
    values.has_child = values.has_child ? 1 : 0;

    values.parent_id = values.parent_id === 'null' ? '' : values.parent_id;


    // values = { ...values, ...attachments };

    setLoading(true);
    Products.request({
      beforeSend: () => {
      },
      success: (res) => {
        handleCancel();
        form.resetFields();
        toast.success(res.message);
        dispatch(getAgainHandler());
      },
      error: ({ response }) => {
        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else if (response?.status !== 404) {
          toast.error(response?.data?.message);
        }
      },
      final: () => {
        setLoading(false);
      },
      // rowData ? 'put' : 'post'
    }).updateCreateCategory(values, rowData?.id);
  };
  const onFinishFailed = () => {
  };


  return (
    <>

      {hasPermission('storehouse_category', ['create']) && <IconBtn
        TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
        btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
        icon={rowData ? <Edit2 variant="Bold" size={22} /> : <LuPlus size={22} />}
        onClick={showModal}
      />
      }

      <Modal
        width={900}
        open={open}
        title={`${rowData ? 'ویرایش' : 'ایجاد'}  دسته بندی `}
        onCancel={handleCancel}
        footer={false}
        // footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     انصراف
        //   </Button>,
        //   <Button
        //     key="submit"
        //     className="defBtn orangeBtn px-4"
        //     loading={loading}
        //     onClick={() => {
        //       form.submit();
        //     }}
        //   >
        //     ثبت
        //   </Button>,
        // ]}
      >
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...rowData,
            description: rowData?.description || '',
            status: rowData?.status || 1,
            has_child: rowData?.has_child || 1,
          }}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="نام"
                name="name"
                validateStatus={error422?.name ? 'error' : 'success'}
                help={error422?.name}
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام را وارد کنید!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="سر دسته"
                validateStatus={error422.parent_id ? 'error' : 'success'}
                help={error422.parent_id}
                name="parent_id"
                rules={[
                  {
                    required: true,
                    message: ' لطفا سر دسته را وارد کنید!',
                  },
                ]}
              >
                <TreeSelect
                  loading={categoryLoading}
                  showSearch
                  fieldNames={{ label: 'name', value: 'id', children: 'children_category' }}
                  allowClear
                  treeData={categoryList}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>


            <div className="col-md-6   ">
              <Form.Item name="description" label="توضیحات">
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
              </Form.Item>
            </div>


            <Form.Item className=""
                       validateStatus={error422.code ? 'error' : 'success'}
                       help={error422.code}
                       label="کد دسته بندی"
                       name="code"
                       rules={[
                         {
                           required: true,
                           message: ' لطفا کد دسته بندی را وارد کنید!',
                         },
                       ]}
            >

              <div className="">
                <CodeBox isEdit={!!rowData} code={code} parentCompleteCode={parentCompleteCode}
                         onChangeCode={(e) => {
                           form.setFieldValue('code', e);
                         }} />
              </div>
            </Form.Item>

            <div className="d-flex align-items-center gap-3">
              <Form.Item
                validateStatus={error422.status ? 'error' : 'success'}
                help={error422.status}
                label="وضعیت"
                name="status"
                valuePropName="checked"
              >
                <Switch checkedChildren="فعال" unCheckedChildren="غیر فعال" />
              </Form.Item>
              <Form.Item
                validateStatus={error422.has_child ? 'error' : 'success'}
                help={error422.has_child}
                label="زیرمجموعه"
                name="has_child"
                valuePropName="checked"
              >
                <Switch checkedChildren="دارد" unCheckedChildren="ندارد" />
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

export default UpdateCreateCategory;
