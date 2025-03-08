import React from 'react';
import { hasPermission } from '../../../permission/module';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import UpdateCreateSuppliers from './UpdateCreateSuppliers';

const StorehouseColumn = () => {
  // const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps] = SearchFilterTable();
  // const [handleSetParams] = UseSetParams();

  // const funcHandleSetParams = (newFilter) => {
  //   handleSetParams(newFilter);
  // };

  const columns = [
    {
      title: 'نام',
      dataIndex: 'name',
      className: 'text-start ',
      key: 'name',
      // ...getColumnSearchProps('نام', filter.name, (res) => {
      //   funcHandleSetParams([{ key: 'name', value: res }]);
      // }),

    },

    {
      title: 'وضعیت',
      dataIndex: 'status',

      key: 'status',
      render: (text) => {
        return (
          <span className={`${Number(text) ? 'text-success' : 'text-danger'}`}>
            {Number(text) ? 'فعال' : 'غیر فعال'}
          </span>
        );
      },

    },
    {
      title: 'عملیات',
      dataIndex: 'function',
      key: 'function',
      fixed: 'right',
      render: (text, row) => {
        return (
          <div className="text-center  d-flex flex-column w-100">
            <div className="text-center d-flex gap-1 d-flex justify-content-center">
              {hasPermission('storehouse_supplier', ['edit']) && <UpdateCreateSuppliers rowData={row} />}
              {hasPermission('storehouse_supplier', ['delete']) && (
                <ConfirmDeleteModal apiAddress="storehouse/supplier/remove" id={row?.id} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default StorehouseColumn;
