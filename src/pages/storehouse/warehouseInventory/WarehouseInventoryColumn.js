import React from 'react';
// eslint-disable-next-line import/no-cycle
import ProductListDrawer from './ProductListDrawer';

const WarehouseInventoryColumn = () => {


  const columns = [
    {
      title: 'انبار',
      dataIndex: 'name',
      className: 'text-start ',
      key: 'name',
      render: (text) => {
        return (
          <div style={{ padding: '7px' }}>
            {text}
          </div>
        );
      },

    },


    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      render: (item, row) => {
        return (
          <div className="text-center  d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {row.mainPlaces ? <ProductListDrawer data={[...row.mainPlaces]} /> : ''}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default WarehouseInventoryColumn;
