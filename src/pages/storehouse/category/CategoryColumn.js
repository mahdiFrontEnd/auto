import React from 'react';
import UpdateCreateCategory from './UpdateCreateCategory';
import { hasPermission } from '../../../permission/module';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const CategoryColumn = () => {
  // const filter = useSelector((state) => state.TableRedux.filter);
  // const [getColumnSearchProps] = SearchFilterTable();
  //
  // const [handleSetParams] = UseSetParams();
  //
  // const funcHandleSetParams = (newFilter) => {
  //   handleSetParams(newFilter);
  // };

  const columns = [
    {
      title: 'نام',
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

      // ...getColumnSearchProps('نام', filter.name, (res) => {
      //   funcHandleSetParams([{ key: 'name', value: res }]);
      // }),


    },

    {

      title: 'کد',
      dataIndex: 'complete_code',
      key: 'complete_code',
      // ...getColumnSearchProps('کد', filter.complete_code, (res) => {
      //   funcHandleSetParams([{ key: 'complete_code', value: res }]);
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
              {hasPermission('storehouse_category', ['edit']) && <UpdateCreateCategory rowData={row} />}
              {hasPermission('storehouse_category', ['delete']) && !row.children_category?.length && (
                <ConfirmDeleteModal apiAddress="storehouse/category/remove" id={row?.id} />
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return [columns];
};

export default CategoryColumn;
