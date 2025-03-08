import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import DescriptionBox from './DescriptionBox';
import SubmitBtnBox from './SubmitBtnBox';
import Storehouse from '../../../../../api/http_request/Model/storehouse/Storehouse';
import NewLoading from '../../../../../layouts/loader/NewLoading';
import { ChangeSubmitStatusForm } from '../../../../../store/storehouse/StorehouseSlice';

const TopTableForm = () => {
  const [topFormData, setTopFormData] = useState({});
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const { submitStatusForm, nextStep, loading, statusForm, type, address, showJson, inOut, processId } =
    useSelector((state) => state.Storehouse);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setTopFormData(values);
    dispatch(ChangeSubmitStatusForm(!submitStatusForm));
  };
  const handleChangeStatus = () => {
    const newData = statusForm.products?.filter((item) => item.selected);

    const data = {
      products: showJson.showSelectItem ? newData : statusForm.products,
      ...topFormData,
    };
    if (!data.products?.length) {
      toast.error('لطفا ابتدا کالاهای مدنظر خود را انتخاب کنید');
    } else {
      handleRequest(`${address}/${id}`, data);
    }

  };
  const handleEntryExit = () => {
    let newData = statusForm.products;

    newData = newData.map(({ product_id, amount, place_id, request_product_id, description }) => {
      return {
        product_id,
        amount,
        request_product_id,
        place_id,
        description,
      };
    });
    const data = {
      products_data: newData,
      in_out: inOut,
      status: 1,
      type: 'store_to_store',
      process_id: processId,
      ...topFormData,
    };

    handleRequest(address, data);

  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (type === 'changeStatus') {
      handleChangeStatus();
    } else if (type === 'EntryExit') {
      handleEntryExit();
    }
  }, [statusForm]);

  const handleRequest = (newAddress, data) => {
    console.log(455454);
    Storehouse.request({
      beforeSend: () => {
        setSubmitLoading(true);
      },
      success: (response) => {
        navigate(-1);
        toast.success(response?.message);
      },
      error: ({ response }) => {
        console.log(response);
        if (response.status) {
          const errors = [];
          Object.entries(response.data.errors).forEach(([, value]) => {
            if (!Number.isFinite(value)) {
              errors.push(
                <p key={value}>
                  <span>{value}</span>
                </p>,
              );
            }

          });
          toast.error(<div>{errors}</div>);
        }
      },
      final: () => {
        setSubmitLoading(false);
      },
    }).handleRequestWare(newAddress, data);
  };

  return (
    <div className="mb-3">
      {!loading ? (
        <Form
          name="basic"
          form={form}
          layout="vertical"
          initialValues={{ description: '' }}
          onFinish={onFinish}>
          <div className="d-flex align-items-center gap-2  justify-content-between">
            <h4 className="mb-0 flex-1 orangeText fw-bold">{nextStep.step_fa}</h4>
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
