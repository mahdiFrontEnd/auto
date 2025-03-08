import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Form, Input, Modal, Select, Switch, TreeSelect } from 'antd';
import { toast } from 'react-toastify';
import { LuPlus } from 'react-icons/lu';
import { Edit2 } from 'iconsax-react';
import { hasPermission } from '../../../permission/module';
import { getAgainHandler } from '../../../store/loading/LoadingSlice';
import IconBtn from '../../../components/MicroComponents/button/IconBtn';
import Storehouse from '../../../api/http_request/Model/storehouse/Storehouse';
import GetStorehouseList from '../../../api/http_request/Model/storehouse/GetPlaceList';
import GetChartList from '../../../api/http_request/Model/storehouse/GetChartList';


const MapBox = React.lazy(() => import('../../../components/MapBox'));


const UpdateCreateWarehouseInventory = ({ rowData }) => {


  const dispatch = useDispatch();
  const [error422, setError422] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [placeList, setPlaceList] = useState([{ name: 'سر دسته ندارد', id: 'null' }]);
  const [parentId, setParentId] = useState();
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartList, setChartList] = useState([]);
  const [hasPartition, setHasPartition] = useState(false);
  const [isPartition, setIsPartition] = useState(true);
  const [hasChild, setHasChild] = useState(false);
  const [showMainParentInfo, setShowMainParentInfo] = useState(false);
  const [parentHasPartition, setParentHasPartition] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (rowData && open) {
      setShowMainParentInfo(`${rowData.parent_id}` === 'null');
      setHasPartition(rowData.has_partition);
      setIsPartition(rowData.is_partition);
      setParentHasPartition(rowData.is_partition);
      setHasChild(rowData?.children_place?.length || `${rowData.parent_id}` === 'null');

      form.setFieldsValue({
        ...rowData,
        parent_id: rowData?.parent_id || 'null',
        description: rowData?.description || '',
        is_partition: rowData?.is_partition,
        chart_id: rowData?.storekeeper?.id,
      });
      setParentId(`${rowData.parent_id}`);
    }


  }, [rowData,open]);
  useEffect(() => {
    if(!open){
      form.resetFields()
      setHasPartition(false);
      setIsPartition(true);
      setHasChild(false);
      setShowMainParentInfo(false);
      setParentHasPartition(false);
    }
  }, [open]);

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {

      GetStorehouseList((e) => {
        setPlaceList([{ name: 'سر دسته ندارد', id: 'null' }, ...e]);
      }, setCategoryLoading);
      GetChartList(setChartList, setChartLoading);


      setError422([]);
    }
  }, [open]);

  const onFinish = (values) => {
    const parentIsNotNull = parentId !== 'null';
    values.status = values.status ? 1 : 0;
    values.parent_id = parentIsNotNull ? values.parent_id : '';
    values.has_partition = values.has_partition && parentIsNotNull ? 1 : 0;
    values.is_partition = isPartition && parentIsNotNull ? 1 : 0;
    values.chart_id = (values.chart_id && parentIsNotNull) ? values.chart_id : null;
    setError422([]);
    setLoading(true);
    Storehouse.request({
      beforeSend: () => {
      }, success: (res) => {
        handleCancel();
        form.resetFields();
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
    }).updateCreatePlace(values, rowData?.id);
  };
  const getSelectedLocation = useCallback((e) => {
    form.setFieldValue('location', JSON.stringify(e));
  });


  const handleSelectParent = (e, v) => {



    setParentId(e);
    setShowMainParentInfo(`${e}` === 'null');
    if (`${e}` === 'null') {
      setHasPartition(false);
    }

    setHasChild(`${e}` === 'null');

    if (!v?.has_partition || `${e}` === 'null') {
      setIsPartition(false);
      setParentHasPartition(false);
    } else if (v?.has_partition) {
      setParentHasPartition(true);
      setIsPartition(true);
    }


  };
  return (<>
    {hasPermission('storehouse_place', ['create']) && (<IconBtn
      TooltipText={rowData ? 'ویرایش' : 'ایجاد'}
      btnClass={rowData ? 'orangeIconBtn' : 'greenIconBtn'}
      icon={rowData ? <Edit2 variant="Bold" size={22} /> : <LuPlus size={22} />}
      onClick={showModal}
    />)}

    <Modal
      width={800}
      open={open}
      title={`${rowData ? 'ویرایش' : 'ایجاد'}  انبار `}
      onCancel={handleCancel}
      footer={false}
      // footer={[<Button key="back" onClick={handleCancel}>
      //   انصراف
      // </Button>, <Button
      //   key="submit"
      //   className="defBtn orangeBtn px-4 ms-3"
      //   loading={loading}
      //   onClick={() => {
      //     form.submit();
      //   }}
      // >
      //   ثبت
      // </Button>]}
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
          has_partition: rowData?.has_partition || 0,
          parent_id: rowData?.has_partition || null,
        }}
      >
        <div className="row">


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
            </Form.Item></div>
          <div className="col-md-6">

            <Form.Item
              label="سر دسته"
              validateStatus={error422.parent_id ? 'error' : 'success'}
              help={error422.parent_id}
              name="parent_id"
              rules={[{
                required: true,
                message: 'لطفا سر دسته را وارد کنید!',
              }]}
            >
              <TreeSelect
                onSelect={handleSelectParent}
                loading={categoryLoading}
                showSearch
                fieldNames={{ label: 'name', value: 'id', children: 'children_place' }}
                allowClear
                treeData={placeList}
              />
            </Form.Item>
          </div>


          {showMainParentInfo && <>
            <div className="col-md-6">
              <Form.Item
                name="phone" label="شماره تماس"
                validateStatus={error422.phone ? 'error' : 'success'}
                help={error422.phone}
              >
                <Input type="number" controls={false} html className="w-100" />
              </Form.Item>

              <Form.Item name="address" label="آدرس">
                <Input.TextArea placeholder="استان - شهر - ادامه آدرس"
                                autoSize={{ minRows: 5, maxRows: 10 }} />
              </Form.Item>
            </div>
            <div className="col-md-6  ">

              <Form.Item name="location" label="لوکیشن" rules={[{
                required: true, message: ' لطفا لوکیشن را وارد کنید!',
              }]}>
                <div className="rounded-3 overflow-hidden" style={{ height: '207px' }}>
                  <React.Suspense fallback={<div></div>}>
                    <MapBox
                      defLocation={rowData?.location ? JSON.parse(rowData.location) : [35.715298, 51.404343]}
                      getSelectedLocation={getSelectedLocation} />
                  </React.Suspense>
                </div>
              </Form.Item>
            </div>


          </>}

          <div className="col-md-6   ">
            <Form.Item name="description" label="توضیحات">
              <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
            </Form.Item>
          </div>
          <div className="col-md-6    ">

            <div className=" d-flex gap-4   ">
              <Form.Item
                validateStatus={error422.status ? 'error' : 'success'}
                help={error422.status}
                label="وضعیت"
                name="status"
                valuePropName="checked"
              >

                <Switch checkedChildren="فعال" unCheckedChildren="غیر فعال" />

              </Form.Item>


              {(!hasChild && !isPartition && !parentHasPartition) ? <Form.Item
                validateStatus={error422.has_partition ? 'error' : 'success'}
                help={error422.has_partition}
                label="دارای پارتیشن"
                name="has_partition"
                valuePropName="checked"
              >
                <Switch onChange={(e) => {
                  setHasPartition(e);
                }} checkedChildren="میباشد" unCheckedChildren="نمیباشد" />
              </Form.Item> : ''}
            </div>
            {
              hasPartition ? <Form.Item
                  label=" سمت انباردار"
                  validateStatus={error422.chart_id ? 'error' : 'success'}
                  help={error422.chart_id}
                  name="chart_id"
                  rules={[{
                    required: true,
                    message: 'لطفا  سمت انباردار را وارد کنید!',
                  }]}
                >

                  <Select loading={chartLoading}
                          allowClear
                          fieldNames={{ label: 'name', value: 'id' }}

                          options={chartList} />


                </Form.Item>
                : ''}
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

export default UpdateCreateWarehouseInventory;
