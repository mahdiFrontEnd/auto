import React from 'react';
import ShowImageBox from '../../../components/MicroComponents/ShowImageBox';
import { getCategory } from '../../../helper/getCategory';
import { baseURL } from '../../../api/http_request/url';

const ProductInventoryColumn = () => {


  const columns = [
    {
      title: <div className="w-100 text-end">کالا</div>,
      dataIndex: 'name',
      className: 'text-start',
      key: 'name',
      render: (text, row) => {
        return (
          <ShowImageBox showSearch searchTooltip="جستجوی این کالا" name={text} qrCode={row.products?.final_code}
                        srcImage={row.products?.attachments?.length > 0 ? `${baseURL}/${row.products?.attachments[0].path.indexArray.small}` : '/noImage.png'} />
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
          <span>{row.products?.final_code}</span>
        );
      },


    },
    {
      title: 'مقدار کل',
      dataIndex: 'total_product',
      className: 'text-start ',
      key: 'total_product',
      render: (text, row) => {
        return (
          <div style={{ padding: '7px' }}>
            <span>{text || 0} </span>
            <span>{row.products?.unit?.unit_value}</span>
          </div>
        );
      },

    },
    {
      title: 'مقدار فریز شده',
      dataIndex: 'freeze_product',
      className: 'text-start ',
      key: 'freeze_product',
      render: (text, row) => {
        return (
          <div style={{ padding: '7px' }}>
            <span>{text || 0} </span>
            <span>{row.products?.unit?.unit_value}</span>
          </div>
        );
      },

    },
    {
      title: 'مقدار در دسترس',
      dataIndex: 'marketable_product',
      className: 'text-start ',
      key: 'marketable_product',
      render: (text, row) => {
        return (
          <div style={{ padding: '7px' }}>
            <span>{text || 0} </span>
            <span>{row.products?.unit?.unit_value}</span>
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
            {row.products?.brand?.name}
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
            {getCategory(row.products?.category)}
          </div>
        );
      },

    },


  ];
  return [columns];
};

export default ProductInventoryColumn;
