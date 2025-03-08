import React from 'react';
// eslint-disable-next-line import/no-cycle
import ShowImageBox from '../../../components/MicroComponents/ShowImageBox';
import { getCategory } from '../../../helper/getCategory';
import { baseURL } from '../../../api/http_request/url';

const WarehouseInventoryProductColumn = () => {


  const columns = [
    {
      title: 'کالا',
      dataIndex: 'product',
      className: 'text-start ',
      key: 'product',
      render: (text) => {
        return (
          <ShowImageBox showSearch searchTooltip="جستجوی این کالا" name={text?.name} qrCode={text?.final_code}
                        srcImage={text?.attachments?.length > 0 ? `${baseURL}/${text?.attachments[0].path.indexArray.small}` : '/noImage.png'} />
        );
      },

    },
    {
      title: 'کد کالا',
      dataIndex: 'final_code',
      className: 'text-start ',
      key: 'final_code',
      render: (text, row) => {
        return (
          <span>{row.product?.final_code}</span>
        );
      },

    },
    {
      title: 'موجودی',
      dataIndex: 'total_product',
      className: 'text-start ',
      key: 'total_product',
      render: (text, row) => {
        console.log(row);
        return (
          <div style={{ padding: '7px' }}>
            <span>{text || 0} </span>
            <span>{row.product?.unit?.unit_value}</span>
          </div>
        );
      },

    },
    {
      title: 'برند',
      dataIndex: 'brand',
      className: 'text-start ',
      key: 'brand',
      render: (text, row) => {
        return (
          <div style={{ padding: '7px' }}>
            {row.product?.brand?.name}
          </div>
        );
      },

    },
    {
      title: 'دسته بندی',
      dataIndex: 'category',
      className: 'text-start ',
      key: 'category',
      render: (text, row) => {
        return (
          <div style={{ padding: '7px' }}>
            {getCategory(row.product?.category)}
          </div>
        );
      },

    },

  ];
  return [columns];
};

export default WarehouseInventoryProductColumn;
