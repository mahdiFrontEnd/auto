import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';
import useGetProductListStoreOut from '../../../../../api/http_request/Model/products/GetProductListStoreOut';

const ProductSelectBox = (props) => {
  const { productList, productListLoading } = useSelector((state) => state.Storehouse);
  const fetchProductList = useGetProductListStoreOut();

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  return (<div className="flex-1 d-flex gap-2 align-items-center justify-content-center">

      <Form.Item className="mb-0 d-none w-0"
                 name="product"
      >
        <Input allowClear placeholder="نام محصول" hidden />
      </Form.Item>


      <Form.Item className="mb-0 flex-1"
                 name="product_id"
                 rules={[{ required: true, message: '' }]}
      >
        <Select allowClear placeholder="نام محصول"
                onChange={props.handleChange}
                className="w-100"
                fieldNames={{ label: 'name', value: 'id' }}
                options={productList}
                loading={productListLoading} />
      </Form.Item>


    </div>
  );
};

export default ProductSelectBox;