import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal, Select, Switch, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { LuPlus } from 'react-icons/lu';
import OtpInput from 'react-otp-input';
import { Edit2 } from 'iconsax-react';
import Products from '../../../api/http_request/Model/products/Products';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import GetBrandList from '../../../api/http_request/Model/products/GetBrandList';
// import GetTypeList from '../../../api/http_request/Model/products/GetTypeList';
import UploadByForm from '../../../components/MicroComponents/UploadByForm';
import GetUnitsList from '../../../api/http_request/Model/common/GetUnitsList';
import { convertPersianNumberToEng } from '../../../helper/convertPersianNumberToEng';
import { findItemById } from '../../../helper/findItemById';
import CustomTree from '../../../components/select/CustomTree';
import getCategoryListForProduct from '../../../api/http_request/Model/products/getCategoryListForProduct';
import GetSupplierList from '../../../api/http_request/Model/commerce/supplier';


const UpdateCreateProduct = ({ rowData }) => {
  const dispatch = useDispatch();
  const [attachments, setAttachments] = useState([]);
  const [error422, setError422] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  // const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);
  // const [typeLoading, setTypeLoading] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);
  const [value, setValue] = useState('');
  const [selectedParent, setSelectedParent] = useState({});
  const [deletedItems, setDeletedItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersLoading, setSuppliersLoading] = useState(false);
  // const [attribute, setAttribute] = useState([]);
  // const [attributeLoading, setAttributeLoading] = useState(false);
  const handleChange = (newValue) => {
    if (newValue) {
      const item = findItemById(categoryList, newValue, 'children_category');
      setSelectedParent(item);
    } else {
      setSelectedParent({});
    }

  };

  const showModal = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (rowData) {
      const getLastId = (obj, children) => {
        let id = null;
        while (obj) {
          if (!obj[children]) {
            id = obj?.id;
          }
          obj = obj[children]; // به سطح بعدی برو
        }
        return id;
      };
      form.setFieldsValue({
        ...rowData,
        description: rowData.description ?? '',
        category_id: getLastId(rowData.category, 'children_category'),
        brand_id: rowData.brand?.id, //getLastId(rowData.brand, 'children_brand'),
        type_id: rowData.type?.id,
        unit_id: rowData.unit?.id,
        supplier_ids: rowData.suppliers ? rowData.suppliers?.map((item) => item.id) : null,
        // attribute_ids: rowData.attribute_values?.map((item) => item.id),
      });
      setSelectedParent(rowData.category);
      setValue(rowData?.code);
    }
  }, [rowData]);
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      getCategoryListForProduct(setCategoryList, setCategoryLoading, { skip: 0, take: 5000 });
      GetBrandList(setBrandList, setBrandLoading);
      // GetTypeList(setTypeList, setTypeLoading);
      GetUnitsList(setUnitList, setUnitLoading);
      GetSupplierList(setSuppliers, setSuppliersLoading);
      // GetAttributeList(setAttribute, setAttributeLoading, { skip: 0, take: 5000 });
      setError422([]);
    }
  }, [open]);
  // useEffect(() => {
  //   const filteredAttachments = attachments.filter(item =>{
  //     return 55
  //   });
  // }, []);
  const onFinish = (values) => {
    values = { ...values, ...attachments };
    delete values.attachments;
    delete values.files;
    setError422([]);
    values.status = values.status ? 1 : 0;
    values.code = value;
    if (deletedItems.length) {
      deletedItems.forEach((item, index) => {
        values[`image_ids[${index}]`] = item;
      });
    } else {
      values.image_ids = '';
    }
    if (values.supplier_ids?.length) {
      values.supplier_ids.forEach((item, index) => {
        values[`supplier_ids[${index}]`] = item;
      });
    }

    if (values.parent_id === 0) {
      values.parent_id = null;
    }

    setLoading(true);
    Products.request({
      beforeSend: () => {
      }, success: (res) => {
        handleCancel();
        form.resetFields();
        setSelectedParent({});
        setValue('');
        toast.success(res.message);
        dispatch(getAgainHandler());
      }, error: ({ response }) => {
        if (response?.status === 422) {
          setError422(response?.data?.errors);
        } else {
          toast.error(response?.data?.message);
        }
      }, final: () => {
        setLoading(false);
      },
    }).updateCreateProduct(values, rowData?.id);
  };
  return (<>
    <IconBtn
      TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
      btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
      icon={rowData ? <Edit2 variant="Bold" size={22} /> : <LuPlus size={22} />}
      onClick={showModal}
    />

    <Modal
      width={900}
      open={open}
      title={`${rowData ? 'ویرایش' : 'ایجاد'}  محصول `}
      onCancel={handleCancel}
      footer={false}
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
          brand_id: '',
          supplier_ids: [],
        }}


      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item
              name="attachments"
              label="فایل"
              validateStatus={error422?.attachments ? 'error' : 'success'}
              help={error422?.attachments}
            >
              <UploadByForm rowData={rowData} getDeletedItems={setDeletedItems} onChangeImage={(e) => {
                setAttachments(e);
                form.setFieldValue('attachments', e);
              }}

              />
            </Form.Item>
          </div>
          <div className="col-md-6">


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


          <div className="col-md-6   ">
            <Form.Item
              label="دسته بندی"
              validateStatus={error422.category_id ? 'error' : 'success'}
              help={error422.category_id}
              name="category_id"
              rules={[{
                required: true, message: ' لطفا دسته بندی را وارد کنید!',
              }]}
            >
              <CustomTree
                fieldNames={{ label: 'title', key: 'id', value: 'id', children: 'children_category' }}
                // showSearch
                loading={categoryLoading}
                allowClear
                onChange={handleChange}
                treeData={categoryList}
              />

            </Form.Item>
          </div>
          <div className="col-md-6   ">
            <div className="d-flex gap-1  align-items-end ">

              <Form.Item name="code" label="کد محصول"
                         validateStatus={error422.code ? 'error' : 'success'}
                         help={error422.code}
                // rules={[{
                //   required: true, message: ' لطفا کد محصول را وارد کنید!',
                // }]}
              >
                <div dir="ltr">
                  <OtpInput inputType="tel" shouldAutoFocus
                            inputStyle="otpInput"
                            onChange={(e) => {
                              setValue(convertPersianNumberToEng(e));
                              form.setFieldValue('code', convertPersianNumberToEng(e));
                            }}
                            value={value}
                            numInputs={3}
                            renderSeparator={<span className="mx-1">-</span>}
                            renderInput={(props) => <input  {...props} />}
                  /></div>
              </Form.Item>
              <Form.Item
              > {selectedParent?.code && <div className="d-flex align-items-center gap-1"><span>-</span>
                <div className="fs-4 align-items-center d-flex px-2"
                     style={{
                       borderRadius: '5px', border: '1px solid #dee2e6', height: '40px',


                     }}><span style={{ letterSpacing: '0.3rem' }}>{selectedParent.complete_code}</span></div>
              </div>}</Form.Item>


            </div>
          </div>

          <div className="col-md-6   ">
            <Form.Item
              label="نام"
              name="name"
              validateStatus={error422?.name ? 'error' : 'success'}
              help={error422?.name}
              rules={[{
                required: true, message: 'لطفا نام را وارد کنید!',
              }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="col-md-6   ">
            <Form.Item
              label="برند"
              validateStatus={error422.brand_id ? 'error' : 'success'}
              help={error422.brand_id}
              name="brand_id"
            >
              <TreeSelect loading={brandLoading}
                          showSearch
                          fieldNames={{ label: 'name', value: 'id', children: 'children_brand' }}
                          allowClear
                          treeData={brandList}
              />
            </Form.Item>
          </div>
          <div className="col-md-6   ">
            <Form.Item
              label="تامین کننده"
              validateStatus={error422.supplier_ids ? 'error' : 'success'}
              help={error422.supplier_ids}
              name="supplier_ids"

            >
              <Select
                mode="tags"
                loading={suppliersLoading}
                showSearch
                fieldNames={{ label: 'name', value: 'id' }}
                allowClear
                options={suppliers}
              />
            </Form.Item>
          </div>
          {/*<div className="col-md-6   ">*/}

          {/*  <Form.Item*/}
          {/*    label="نوع محصول"*/}
          {/*    validateStatus={error422.type_id ? 'error' : 'success'}*/}
          {/*    help={error422.type_id}*/}
          {/*    name="type_id"*/}
          {/*    rules={[{*/}
          {/*      required: true, message: ' لطفا نوع محصول را وارد کنید!',*/}
          {/*    }]}*/}
          {/*  >*/}
          {/*    <Select*/}
          {/*      loading={typeLoading}*/}
          {/*      showSearch*/}
          {/*      fieldNames={{ label: 'name', value: 'id' }}*/}
          {/*      allowClear*/}
          {/*      options={typeList}*/}
          {/*    />*/}
          {/*  </Form.Item>*/}

          {/*</div>*/}
          <div className="col-md-6   ">
            <Form.Item
              label="واحد اندازه گیری"
              validateStatus={error422.unit_id ? 'error' : 'success'}
              help={error422.unit_id}
              name="unit_id"
              rules={[{
                required: true, message: ' لطفا واحد اندازه گیری را وارد کنید!',
              }]}
            >
              <Select
                loading={unitLoading}
                showSearch
                fieldNames={{ label: 'unit_value', value: 'id' }}
                allowClear
                options={unitList}
              />
            </Form.Item>
          </div>
          {/*<div className="col-md-6   ">*/}
          {/*  <Form.Item*/}
          {/*    label="ویژگی ها"*/}
          {/*    validateStatus={error422.attribute_ids ? 'error' : 'success'}*/}
          {/*    help={error422.attribute_ids}*/}
          {/*    name="attribute_ids"*/}
          {/*  >*/}

          {/*    <Select mode="tags"*/}
          {/*            loading={attributeLoading}*/}
          {/*            showSearch*/}
          {/*            fieldNames={{ label: 'name', value: 'id' }}*/}
          {/*            allowClear*/}
          {/*            options={attribute}*/}
          {/*    />*/}
          {/*  </Form.Item>*/}
          {/*</div>*/}


          <div>
            <Form.Item name="description" label="توضیحات">
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
  </>);
};

export default UpdateCreateProduct;

