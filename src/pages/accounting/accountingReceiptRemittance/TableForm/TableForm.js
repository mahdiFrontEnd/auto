import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeadersBox from './HeadersBox';
import RowBox from './RowBox';
import ShowMainInfo from '../ShowMainInfo';
import Storehouse from '../../../../api/http_request/Model/storehouse/Storehouse';
import NewLoading from '../../../../layouts/loader/NewLoading';

const TableForm = () => {
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const navigate = useNavigate();

  const [dataArray, setDataArray] = useState([]);
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { type, id } = useParams();


  useEffect(() => {
    setLoading(true);


    Storehouse.request({
      success: async ({ result }) => {
        setData(result);
        const newData = result?.form_product?.map((item) => {
          return {
            ...item, form_product_id: item.id,
            'supplier_id': null,
            'expire_date': null,
            'batch_number': null,
            'price': null,
            'price_type': null,
          };
        });
        setDataArray(newData);
      }, error: (error) => {
        toast.error(error.message);

      }, final: () => {
        setLoading(false);

      },
    }).setHeader('list', type).AccountingStorehouseShow(id);


  }, []);


  const onFinish = (values) => {

    values.form_id = id;
    console.log(values);

    Storehouse.request({
      success: async (x) => {
        navigate(-1);

        console.log(x);
      }, error: (error) => {
        toast.error(error.message);

      }, final: () => {
        setLoading(false);

      },
    }).AccountingStorehouseStore(values);


  };

  return (<div className="" style={{ overflow: 'auto' }}>
    <div className="" style={{ minWidth: '800px' }}>


      {dataArray?.length ? <Form
        form={form}
        name="dynamic_form"
        onFinish={onFinish}
        initialValues={{
          form_products: dataArray,
        }}
      >
        <ShowMainInfo data={data} showSubmitBtn />
        <HeadersBox />
        <Form.List name="form_products">
          {(fields) => {
            return <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => {
                return <RowBox item={dataArray[index]} index={index} name={name} restField={{ ...restField }} />;
              })}
            </>;
          }}
        </Form.List>
      </Form> : <>
        {Array.from(Array(3).keys()).map((item) => (
          <div
            key={item}
            style={{ height: '40px' }}
            className="mb-2 rounded-2 overflow-hidden w-100"
          >
            <NewLoading />
          </div>
        ))}
      </>}


    </div>
  </div>);
};

export default TableForm;
